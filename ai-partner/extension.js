// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const openai = require('openai');

openai.setApiEndpoint('https://api.openai.com');
openai.setApiVersion('v1');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

openai.apiKey = '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';
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "ai-partner" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  async function generateText(prompt) {
    const completions = await openai.completions.create({
      engine: 'davinci',
      prompt,
      max_tokens: 1024,
      n: 1,
      temperature: 0.5,
    });
    return completions.choices[0].text;
  }

  let disposable = vscode.commands.registerCommand(
    'ai-partner.helloWorld',
    async function run(prompt) {
      if (!prompt) {
        const result = await vscode.window.showInputBox({
          prompt: 'Enter a prompt:',
        });
        if (!result) {
          return;
        }
        prompt = result;
      }
      const text = await generateText(prompt);
      vscode.window.showInformationMessage(text);
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
