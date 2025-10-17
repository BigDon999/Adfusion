Param(
    [Parameter(Mandatory=$true)][string]$AWS_REGION,
    [Parameter(Mandatory=$true)][string]$AWS_S3_BUCKET,
    [Parameter(Mandatory=$true)][string]$AWS_ACCESS_KEY_ID,
    [Parameter(Mandatory=$true)][string]$AWS_SECRET_ACCESS_KEY
)

$content = @"
AWS_REGION=$AWS_REGION
AWS_S3_BUCKET=$AWS_S3_BUCKET
AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
"@

$out = Join-Path -Path (Get-Location) -ChildPath ".env.local"
$content | Out-File -Encoding utf8 $out

Write-Host ".env.local written at $out — do NOT commit this file."
