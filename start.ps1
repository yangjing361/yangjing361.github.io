$ErrorActionPreference = 'Stop'
$port = 8765
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$url = "http://localhost:$port/"

Set-Location -LiteralPath $root

try {
    $response = Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 1
    if ($response.StatusCode -eq 200) {
        Write-Host "Body Progress is already running at $url"
        Start-Process $url
        exit 0
    }
}
catch {
    # No server is running yet. Start one below.
}

Write-Host "Body Progress is running at $url"
Write-Host "Press Ctrl+C to stop."
Start-Process $url
python -m http.server $port --bind 127.0.0.1
