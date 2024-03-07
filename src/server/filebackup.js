const fs = require('fs');
const path = require('path');

// Function to back up accounts.json
function backupAccountsFile() {
    const accountsFilePath = path.join(__dirname, 'accounts.json');
    const backupDir = path.join(__dirname, 'server', 'backups');
    const backupFileName = `accounts_backup_${Date.now()}.json`;

    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }

    fs.copyFileSync(accountsFilePath, path.join(backupDir, backupFileName));
    console.log('accounts.json backed up successfully.');
}

// Schedule backup function to run every 4 hours (14400000 milliseconds)
setInterval(backupAccountsFile, 1); //14400000

