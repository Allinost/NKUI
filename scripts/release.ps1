param(
    [Parameter(Mandatory = $true)]
    [string]$Version
)

# Validate version format (e.g., 1.2.3 or 1.2.3-alpha)
if ($Version -notmatch '^\d+\.\d+\.\d+(-[\w.]+)?$') {
    Write-Error "Version must be in format like 1.0.0 or 1.0.0-alpha"
    exit 1
}

$Tag = "v$Version"

Write-Host "==> Creating tag $Tag ..." -ForegroundColor Cyan
git tag -a $Tag -m "release $Tag"

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to create tag"
    exit 1
}

Write-Host "==> Pushing tag $Tag to origin ..." -ForegroundColor Cyan
git push origin $Tag

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to push tag"
    exit 1
}

Write-Host "==> Done! GitHub Actions will now build and deploy:" -ForegroundColor Green
Write-Host "    https://github.com/Allinost/NKUI/actions" -ForegroundColor Cyan
Write-Host "    https://allinost.github.io/NKUI/" -ForegroundColor Cyan
