Param(
    [string]$UserName = "adfusion-admin-upload",
    [string]$BucketName = "your-bucket-name",
    [string]$Region = "us-east-1",
    [switch]$WriteLocalEnv = $true
)

function Check-Command($cmd) {
    try { Get-Command $cmd -ErrorAction Stop | Out-Null; return $true } catch { return $false }
}

Write-Host "Running full setup: IAM user + policy + access keys."

if (-not (Check-Command 'aws')) {
    Write-Error "AWS CLI not found. Install and configure AWS CLI first. See: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
}

# Create IAM user if missing
try {
    aws iam get-user --user-name $UserName | Out-Null
    Write-Host "User $UserName already exists. Skipping create-user."
} catch {
    Write-Host "Creating user $UserName ..."
    aws iam create-user --user-name $UserName | Out-Null
}

# Create policy JSON (here-string)
$policy = @'
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
'@

$policyFile = Join-Path -Path $env:TEMP -ChildPath "AdfusionS3UploadPolicy.json"
$policy | Out-File -Encoding utf8 $policyFile

# Try to create policy; if exists, find ARN
try {
    $createPolicy = aws iam create-policy --policy-name AdfusionS3UploadPolicy --policy-document file://$policyFile | ConvertFrom-Json
    $policyArn = $createPolicy.Policy.Arn
    Write-Host "Policy created: $policyArn"
} catch {
    Write-Warning "Policy likely already exists. Attempting to find existing policy ARN..."
    $found = aws iam list-policies --scope Local | ConvertFrom-Json
    $policyArn = ($found.Policies | Where-Object { $_.PolicyName -eq 'AdfusionS3UploadPolicy' }).Arn
    if (-not $policyArn) {
        Write-Error "Could not find or create policy. Inspect AWS console."
        exit 1
    }
    Write-Host "Found policy ARN: $policyArn"
}

# Attach policy to user
Write-Host "Attaching policy to user $UserName ..."
aws iam attach-user-policy --user-name $UserName --policy-arn $policyArn

# Create access key
Write-Host "Creating access key for $UserName ..."
$keys = aws iam create-access-key --user-name $UserName | ConvertFrom-Json

Write-Host "--- CREDENTIALS (copy these now) ---"
Write-Host "AWS_ACCESS_KEY_ID = $($keys.AccessKey.AccessKeyId)"
Write-Host "AWS_SECRET_ACCESS_KEY = $($keys.AccessKey.SecretAccessKey)"
Write-Host "AWS_REGION = $Region"
Write-Host "AWS_S3_BUCKET = $BucketName"
Write-Host "------------------------------------"

if ($WriteLocalEnv) {
    Write-Host "Writing .env.local with these values (will overwrite if exists)."
    $envContent = @"
AWS_REGION=$Region
AWS_S3_BUCKET=$BucketName
AWS_ACCESS_KEY_ID=$($keys.AccessKey.AccessKeyId)
AWS_SECRET_ACCESS_KEY=$($keys.AccessKey.SecretAccessKey)
"@
    $envPath = Join-Path -Path (Get-Location) -ChildPath ".env.local"
    $envContent | Out-File -Encoding utf8 $envPath
    Write-Host ".env.local written to $envPath — do NOT commit this file."
}

Write-Host "NEXT STEPS: Add these environment variables to Vercel (recommended)"
Write-Host "Either use the Vercel Dashboard (Project → Settings → Environment Variables) or Vercel CLI."
Write-Host "If you have Vercel CLI installed and are logged in, you can run the following (interactive):"
Write-Host "  vercel env add AWS_ACCESS_KEY_ID production"
Write-Host "  vercel env add AWS_SECRET_ACCESS_KEY production"
Write-Host "  vercel env add AWS_REGION production"
Write-Host "  vercel env add AWS_S3_BUCKET production"

Write-Host "Or, in the Vercel dashboard add the variables with the exact values printed above and redeploy."

Write-Host "Done. If you want, run 'npm run dev' and test /admin locally or deploy to Vercel and test the upload flow."
Param(
    [string]$UserName = "adfusion-admin-upload",
    [string]$BucketName = "your-bucket-name",
    [string]$Region = "us-east-1",
    [switch]$WriteLocalEnv = $true
)

function Check-Command($cmd) {
    $which = & where.exe $cmd 2>$null
    return -not [string]::IsNullOrEmpty($which)
}

Write-Host "Running full setup: IAM user + policy + access keys."

if (-not (Check-Command 'aws')) {
    Write-Error "AWS CLI not found. Install and configure AWS CLI first. See: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
}

# Create IAM user if missing
try {
    aws iam get-user --user-name $UserName | Out-Null
    Write-Host "User $UserName already exists. Skipping create-user."
} catch {
    Param(
        [string]$UserName = "adfusion-admin-upload",
        [string]$BucketName = "your-bucket-name",
        [string]$Region = "us-east-1",
        [switch]$WriteLocalEnv = $true
    )

    function Check-Command($cmd) {
        $which = & where.exe $cmd 2>$null
        return -not [string]::IsNullOrEmpty($which)
    }

    Write-Host "Running full setup: IAM user + policy + access keys."

    if (-not (Check-Command 'aws')) {
        Write-Error "AWS CLI not found. Install and configure AWS CLI first. See: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
        exit 1
    }

    # Create IAM user if missing
    try {
        aws iam get-user --user-name $UserName | Out-Null
        Write-Host "User $UserName already exists. Skipping create-user."
    } catch {
        Write-Host "Creating user $UserName ..."
        aws iam create-user --user-name $UserName | Out-Null
    }

    # Create policy JSON
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

    $policyFile = "$env:TEMP\AdfusionS3UploadPolicy.json"
    $policy | Out-File -Encoding utf8 $policyFile

    # Try to create policy; if exists, find ARN
    try {
        $createPolicy = aws iam create-policy --policy-name AdfusionS3UploadPolicy --policy-document file://$policyFile | ConvertFrom-Json
        $policyArn = $createPolicy.Policy.Arn
        Write-Host "Policy created: $policyArn"
    } catch {
        Write-Warning "Policy likely already exists. Attempting to find existing policy ARN..."
        $found = aws iam list-policies --scope Local | ConvertFrom-Json
        $policyArn = ($found.Policies | Where-Object { $_.PolicyName -eq 'AdfusionS3UploadPolicy' }).Arn
        if (-not $policyArn) {
            Write-Error "Could not find or create policy. Inspect AWS console."
            exit 1
        }
        Write-Host "Found policy ARN: $policyArn"
    }

    # Attach policy to user
    Write-Host "Attaching policy to user $UserName ..."
    aws iam attach-user-policy --user-name $UserName --policy-arn $policyArn

    # Create access key
    Write-Host "Creating access key for $UserName ..."
    $keys = aws iam create-access-key --user-name $UserName | ConvertFrom-Json

    Write-Host "--- CREDENTIALS (copy these now) ---"
    Write-Host "AWS_ACCESS_KEY_ID = " $keys.AccessKey.AccessKeyId
    Write-Host "AWS_SECRET_ACCESS_KEY = " $keys.AccessKey.SecretAccessKey
    Write-Host "AWS_REGION = " $Region
    Write-Host "AWS_S3_BUCKET = " $BucketName
    Write-Host "------------------------------------"

    if ($WriteLocalEnv) {
        Write-Host "Writing .env.local with these values (will overwrite if exists)."
        $envContent = @"
    AWS_REGION=$Region
    AWS_S3_BUCKET=$BucketName
    AWS_ACCESS_KEY_ID=$($keys.AccessKey.AccessKeyId)
    AWS_SECRET_ACCESS_KEY=$($keys.AccessKey.SecretAccessKey)
    "@
        $envPath = Join-Path -Path (Get-Location) -ChildPath ".env.local"
        $envContent | Out-File -Encoding utf8 $envPath
        Write-Host ".env.local written to $envPath — do NOT commit this file."
    }

    Write-Host "NEXT STEPS: Add these environment variables to Vercel (recommended)"
    Write-Host "Either use the Vercel Dashboard (Project → Settings → Environment Variables) or Vercel CLI."
    Write-Host "If you have Vercel CLI installed and are logged in, you can run the following (interactive):"
    Write-Host "  vercel env add AWS_ACCESS_KEY_ID production"
    Write-Host "  vercel env add AWS_SECRET_ACCESS_KEY production"
    Write-Host "  vercel env add AWS_REGION production"
    Write-Host "  vercel env add AWS_S3_BUCKET production"

    Write-Host "Or, in the Vercel dashboard add the variables with the exact values printed above and redeploy."

    Write-Host "Done. If you want, run 'npm run dev' and test /admin locally or deploy to Vercel and test the upload flow."
