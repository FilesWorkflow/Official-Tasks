FilesWorkflow provides ready-to-use task templates to help you get started quickly. These templates are available on GitHub for both JavaScript and TypeScript, covering browser-tasks and server-tasks.

Template Repositories:
Browser-Task (JavaScript): https://github.com/FilesWorkflow/browser-task-js-template

Browser-Task (TypeScript): https://github.com/FilesWorkflow/browser-task-ts-template

Server-Task (JavaScript): https://github.com/FilesWorkflow/server-task-js-template

Server-Task (TypeScript): https://github.com/FilesWorkflow/server-task-ts-template

## How to Use:

1. Clone the desired template repository:

```
git clone git@github.com:FilesWorkflow/server-task-ts-template.git
```

2. Navigate to the cloned directory and install dependencies:

```
cd server-task-ts-template
npm install
```

3. Configure your task by editing the taskConfig in package.json:

```
{
  "taskConfig": {
    "name": "My Custom Task",
    "description": "A brief description of what this task does",
    "inputType": 0,
    "supportedFileTypes": ["png", "jpg"],
    "params": [
      {
        "id": "quality",
        "key": "quality",
        "defaultValue": 0.8
      }
    ]
  }
}
```

**inputType**: 0 (single file), 1 (multiple files)

4. Develop and test your task using the provided development environment.

```
npm run dev
```

5. Build your task:

```
npm run build
```

6. Import your task:

- Go to the task editing page in FilesWorkflow.
- Click on "Import".
- Select the root directory of the project.
- FilesWorkflow will automatically populate the task settings based on your taskConfig.

These templates provide a solid foundation for creating custom tasks in FilesWorkflow, allowing you to focus on implementing your specific functionality.
