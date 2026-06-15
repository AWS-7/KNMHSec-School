param(
    [Parameter(Mandatory = $true)]
    [string]$VpsIp,

    [string]$User = "root",
    [string]$RemotePath = "/var/www/knmh-school"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $root ".env.local"

if (-not (Test-Path $envFile)) {
    Write-Error ".env.local not found. Add Supabase keys first."
}

Write-Host "Uploading .env.local to ${User}@${VpsIp}:${RemotePath}/.env.local"
scp $envFile "${User}@${VpsIp}:${RemotePath}/.env.local"

if ($LASTEXITCODE -ne 0) {
    Write-Error "scp failed. Install OpenSSH client and ensure VPS path exists."
}

Write-Host "Done. SSH in and run:"
Write-Host "  ssh ${User}@${VpsIp}"
Write-Host "  cd ${RemotePath} && sudo bash deploy/full-vps-deploy.sh ${VpsIp}"
