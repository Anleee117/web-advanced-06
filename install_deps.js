const { execSync } = require('child_process');

console.log('Installing dependencies in Buoi 6...');
try {
  const output = execSync('npm install', {
    cwd: __dirname,
    encoding: 'utf-8',
    stdio: 'pipe'
  });
  console.log(output);
} catch (error) {
  console.log('STDOUT:', error.stdout);
  console.log('STDERR:', error.stderr);
}
