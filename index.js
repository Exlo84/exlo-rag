const { exec } = require('child_process');

exec('npm start', { cwd: 'frontend' }, (error, stdout, stderr) => {
  if (error) {
    console.error(`Frontend error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Frontend stderr: ${stderr}`);
    return;
  }
  console.log(`Frontend stdout: ${stdout}`);
});

exec('npm start', { cwd: 'backend' }, (error, stdout, stderr) => {
  if (error) {
    console.error(`Backend error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Backend stderr: ${stderr}`);
    return;
  }
  console.log(`Backend stdout: ${stdout}`);
});
