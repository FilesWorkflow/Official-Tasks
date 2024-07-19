import fs from 'fs';
import task from '../dist/task.js';
const testFile0 = fs.readFileSync('test/test_file');
const result = await task(
    [new File([testFile0], 'test_file_0')], { emailTo: 'antscript@gmail.com' }
);