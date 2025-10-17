Param(
    [string]$UserName = "adfusion-admin-upload",
    [string]$BucketName = "your-bucket-name",
    [string]$PolicyName = "AdfusionS3UploadPolicy",
    [string]$Region = "us-east-1"
)

Write-Host "This script will create an IAM user, attach a limited S3 policy, and create access keys."
Write-Host "You must run this with AWS CLI configured with an account that can create IAM users and policies."

# Create the IAM user
Write-Host "Creating user $UserName ..."
aws iam create-user --user-name $UserName | Out-Null

# Create policy document
$policy = @"
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [ "s3:PutObject", "s3:PutObjectAcl", "s3:GetObject" ],
      "Resource": "arn:aws:s3:::$BucketName/*"
    }
  ]
}
"@

$policyFile = "$env:TEMP\${PolicyName}.json"
$policy | Out-File -Encoding utf8 $policyFile

Write-Host "Creating managed policy $PolicyName ..."
$createPolicy = aws iam create-policy --policy-name $PolicyName --policy-document file://$policyFile | ConvertFrom-Json
$policyArn = $createPolicy.Policy.Arn

Write-Host "Attaching policy to user..."
aws iam attach-user-policy --user-name $UserName --policy-arn $policyArn

Write-Host "Creating access keys for user..."
$keys = aws iam create-access-key --user-name $UserName | ConvertFrom-Json

Write-Host "DONE. Here are the credentials (copy them now, secret shown only once):"
Write-Host "AccessKeyId: " $keys.AccessKey.AccessKeyId
Write-Host "SecretAccessKey: " $keys.AccessKey.SecretAccessKey

Write-Host "Region (use this for AWS_REGION): $Region"
Write-Host "Bucket: $BucketName"

Write-Host "You can now add these values to Vercel Environment Variables or create a local .env.local file."
