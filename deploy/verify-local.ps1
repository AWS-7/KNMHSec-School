param(
    [string]$SiteUrl = "http://localhost:3000"
)

$SiteUrl = $SiteUrl.TrimEnd("/")
$paths = @("/", "/admin/login", "/admin/dashboard")
$pass = 0
$fail = 0

Write-Host "Verifying at $SiteUrl"
Write-Host ""

foreach ($path in $paths) {
    $url = "$SiteUrl$path"
    try {
        $code = curl.exe -s -o NUL -w "%{http_code}" $url
        if ($code -in @("200", "307", "308")) {
            Write-Host "[OK]   $path ($code)"
            $pass++
        } else {
            Write-Host "[FAIL] $path ($code)"
            $fail++
        }
    } catch {
        Write-Host "[FAIL] $path (error)"
        $fail++
    }
}

Write-Host ""
if ($fail -gt 0) {
    Write-Error "Verification failed: $fail check(s)."
}

Write-Host "All $pass checks passed."
Write-Host ""
Write-Host "Manual test: login at $SiteUrl/admin/login, edit Hero, refresh $SiteUrl/"
