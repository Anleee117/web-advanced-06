const { execSync } = require('child_process');

console.log('Running Jest test suite with coverage...');
try {
  const output = execSync('npx jest --coverage', {
    cwd: __dirname,
    encoding: 'utf-8',
    stdio: 'pipe'
  });
  console.log(output);
} catch (error) {
  console.log('STDOUT:', error.stdout);
  console.log('STDERR:', error.stderr);
}
