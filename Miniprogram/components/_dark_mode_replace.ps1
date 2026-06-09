param(
    [string]$ComponentsDir = "C:\Users\Tom\Documents\Projects\NKUI\Miniprogram\components"
)

$ErrorActionPreference = 'Stop'

$mappings = @{
    '#FAFAFA' = 'var(--nk-color-neutral-50, #FAFAFA)'
    '#F5F5F5' = 'var(--nk-color-neutral-100, #F5F5F5)'
    '#EEEEEE' = 'var(--nk-color-neutral-200, #EEEEEE)'
    '#E0E0E0' = 'var(--nk-color-neutral-300, #E0E0E0)'
    '#BDBDBD' = 'var(--nk-color-neutral-400, #BDBDBD)'
    '#9E9E9E' = 'var(--nk-color-neutral-500, #9E9E9E)'
    '#757575' = 'var(--nk-color-neutral-600, #757575)'
    '#616161' = 'var(--nk-color-neutral-700, #616161)'
    '#424242' = 'var(--nk-color-neutral-800, #424242)'
    '#212121' = 'var(--nk-color-neutral-900, #212121)'
    '#000000' = 'var(--nk-color-neutral-1000, #000000)'
    '#2196F3' = 'var(--nk-color-primary-500, #2196F3)'
    '#1E88E5' = 'var(--nk-color-primary-600, #1E88E5)'
    '#1976D2' = 'var(--nk-color-primary-700, #1976D2)'
    '#1565C0' = 'var(--nk-color-primary-800, #1565C0)'
    '#0D47A1' = 'var(--nk-color-primary-900, #0D47A1)'
    '#E3F2FD' = 'var(--nk-color-primary-50, #E3F2FD)'
    '#BBDEFB' = 'var(--nk-color-primary-100, #BBDEFB)'
    '#90CAF9' = 'var(--nk-color-primary-200, #90CAF9)'
    '#64B5F6' = 'var(--nk-color-primary-300, #64B5F6)'
    '#4CAF50' = 'var(--nk-color-success, #4CAF50)'
    '#FF9800' = 'var(--nk-color-warning, #FF9800)'
    '#F44336' = 'var(--nk-color-error, #F44336)'
}

$files = Get-ChildItem -Path $ComponentsDir -Recurse -Filter "*.wxss"

$updatedCount = 0

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $original = $content

    # Pre-step A: Fix ALL double var() patterns generically
    # Matches: var(--nk-color-X, var(--nk-color-X, #HEX)) -> var(--nk-color-X, #HEX)
    $content = [regex]::Replace($content, 'var\(([^,]+),\s*var\(\1,\s*(#[A-Fa-f0-9]{3,6})\)\)', 'var($1, $2)')

    # Pre-step B: Protect ALL existing var() calls with placeholders
    # This prevents hex colors inside var() fallbacks from being re-processed
    # Regex: var( non-paren-chars ( (non-paren-chars) non-paren-chars )* )
    # Correctly handles consecutive var() calls (stops at each ) individually)
    # NOTE: In PowerShell, script block callbacks inside [regex]::Replace need
    # $script: prefix for variable scoping to persist across invocations.
    $varPlaceholders = @{}
    $script:varCounter = 0
    $content = [regex]::Replace($content, 'var\([^()]*(?:\([^()]*\)[^()]*)*\)', {
        param($m)
            $key = "__NK_VAR_$($script:varCounter)" + '__'
            $varPlaceholders[$key] = $m.Value
            $script:varCounter++
            return $key
        })

    # 1. Protect color: #fff / #FFFFFF (text on colored backgrounds stays as-is)
    $content = $content -replace '(?i)(color\s*:\s*)#fff(?![a-fA-F0-9])', '$1__NK_KEEP_COLOR_WHITE__'
    $content = $content -replace '(?i)(color\s*:\s*)#FFFFFF(?![a-fA-F0-9])', '$1__NK_KEEP_COLOR_WHITE__'

    # 2. Protect border-top-color: #fff (Loading spinner)
    $content = $content -replace '(?i)(border-top-color\s*:\s*)#fff(?![a-fA-F0-9])', '$1__NK_KEEP_BORDER_WHITE__'

    # 3. Replace remaining #fff / #FFFFFF with a placeholder (backgrounds, surfaces)
    $content = $content -replace '(?<![a-fA-F0-9])#fff(?![a-fA-F0-9])', '__NK_WHITE_TO_REPLACE__'
    $content = $content -replace '(?<![a-fA-F0-9])#FFFFFF(?![a-fA-F0-9])', '__NK_WHITE_TO_REPLACE__'

    # 4. Convert placeholder to var()
    $content = $content.Replace('__NK_WHITE_TO_REPLACE__', 'var(--nk-color-neutral-0, #FFFFFF)')

    # 5. Replace all other mapped colors (literal string replace)
    # Safe because all var() calls are currently in placeholders
    foreach ($key in $mappings.Keys) {
        $content = $content.Replace($key, $mappings[$key])
    }

    # 6. Restore protected #fff values
    $content = $content.Replace('__NK_KEEP_COLOR_WHITE__', '#fff')
    $content = $content.Replace('__NK_KEEP_BORDER_WHITE__', '#fff')

    # 7. Restore var() calls from placeholders back to originals
    foreach ($key in $varPlaceholders.Keys) {
        $content = $content.Replace($key, $varPlaceholders[$key])
    }

    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.UTF8Encoding]::new($false))
        Write-Output "UPDATED: $($file.FullName)"
        $updatedCount++
    } else {
        Write-Output "SKIPPED (no changes): $($file.Name)"
    }
}

Write-Output "`nDone. $updatedCount files updated."
