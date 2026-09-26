param(
    [ValidateSet('dev', 'build', 'preview', 'typecheck', 'lint')]
    [string]$Task = 'dev'
)

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
$localNode = Join-Path $PSScriptRoot '.local\package\bin'
$previousPath = $env:PATH
try {
    if (Test-Path (Join-Path $localNode 'node.exe')) {
        $env:PATH = "$localNode;$env:PATH"
    }
    $version = & node -p 'process.versions.node'
    if ($LASTEXITCODE -ne 0) { throw 'Install Node.js 22.22 or newer first.' }
    $parsed = [version]$version
    if ($parsed -lt [version]'22.22.0' -or $parsed.Major -eq 23) {
        throw "Node $version is unsupported. Use Node 22.22+ (22.x) or 24+."
    }
    if (!(Test-Path 'node_modules\vite\bin\vite.js')) {
        throw 'Dependencies are missing. Run bun install --frozen-lockfile first (see README.md).'
    }
    if ($Task -eq 'dev') {
        & node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 3000 --strictPort
    } elseif ($Task -eq 'typecheck') {
        & node node_modules/typescript/bin/tsc --noEmit
    } elseif ($Task -eq 'lint') {
        & node node_modules/eslint/bin/eslint.js .
    } else {
        & node node_modules/vite/bin/vite.js $Task
    }
    $taskExitCode = $LASTEXITCODE
} finally {
    $env:PATH = $previousPath
}
exit $taskExitCode
