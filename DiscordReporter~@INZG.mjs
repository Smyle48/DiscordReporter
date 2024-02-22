process.on('warning', (warning) => {
  if (warning.name === 'DeprecationWarning' && warning.message.includes('punycode')) {
    // Ignoriere das Deprecation-Warning für das punycode-Modul
    return;
  }
  console.warn(warning);
});


import fetch from 'node-fetch';
import chalk from 'chalk';
import readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const validUsername = 'root';
const validPassword = 'root';
const discordToken = 'MTE4NzYxOTIxMDA1OTMyNTQ1MA.GXfyQc.kXxZBWd5OMBW_YP3dX3w7-E7GLgwmAfYFkzP1E';

login();

function login() {
  console.clear();
  generateColoredAsciiArt();

  rl.question('\x1b[31mUsername: \x1b[0m', (username) => {
    rl.question('\x1b[31mPassword: \x1b[0m', (password) => {
      if (username === validUsername && password === validPassword) {
        console.log('\x1b[32mLogin successful! Logging in...\x1b[0m');
        setTimeout(() => {
          startScript();
        }, 2000);
      } else {
        console.clear();
        console.log('\x1b[31mERROR: Invalid username or password. Please try again.\x1b[0m');
        login();
      }
    });
  });
}

async function fetchDiscordUserData(userId) {
  const url = `https://discord.com/api/v10/users/${userId}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bot ${discordToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching Discord user data: ${response.statusText}`);
  }

  return response.json();
}


rl.question('User ID: ', async (userId) => {
  try {
    const userData = await fetchDiscordUserData(userId);

    if (userData.id) {
      console.log(chalk.green('User found!'));
      console.log('', userData);
      console.log();
      console.log(chalk.red('Are you sure you want to report this user ID?'));
      console.log();

      rl.question(chalk.yellow('Start(') + chalk.green('Y') + chalk.yellow('/' + chalk.red('N') + '): '), (startInput) => {
        const startInputUpper = startInput.toUpperCase();

        if (startInputUpper === 'Y') {
          console.clear();
          generateColoredAsciiArt();

          let reportingInterval;
          let reportingSpeed = getRandomReportingSpeed();

          const stopReporting = () => {
            clearInterval(reportingInterval);
            console.log(chalk.blue('Successfully stopped!'));
            startScript();
          };

          reportingInterval = setInterval(() => {
            console.log(chalk.yellow('Reporting...'));
            const reportStatus = getRandomReportStatus();
            const reportColor = reportStatus.includes('successfully') ? 'green' : 'red';
            console.log(chalk[reportColor](reportStatus));
            console.log(); // Eine Zeile freilassen

            // Ändere die Geschwindigkeit nach zufälliger Zeit
            if (Math.random() < 0.1) {
              reportingSpeed = getRandomReportingSpeed();
              console.log(`Reporting speed changed to ${reportingSpeed}ms`);
            }
          }, reportingSpeed);

          rl.on('line', (input) => {
            if (input.toLowerCase() === 'stop') {
              stopReporting();
            }
          });

          rl.on('close', () => {
            stopReporting();
          });
        } else if (startInputUpper === 'N') {
          console.log('Pu$$y');
          askUserId(); // Frage erneut nach der User ID
        } else {
          console.log('Invalid input. Please enter either "Y" or "N".');
          askUserId(); // Frage erneut, bis gültige Eingabe (Y/N) erfolgt
        }
      });
    } else {
      console.log(chalk.red('User not found!'));
      askUserId(); // Frage erneut nach der User ID
    }
  } catch (error) {
    console.error('User not found!');
    login();
  }
});



// Funktion zur Bereitstellung zufälliger Berichtszeiten
function getRandomReportingSpeed() {
  const minSpeed = 20; // Minimale Geschwindigkeit in Millisekunden
  const maxSpeed = 2000; // Maximale Geschwindigkeit in Millisekunden
  return Math.floor(Math.random() * (maxSpeed - minSpeed + 1) + minSpeed);
}

// ASCII Art für "Discord REP" mit manuell festgelegten Farben
function generateColoredAsciiArt() {
  const asciiArt = `
                                          \x1b[31m·▄▄▄▄  ▪  .▄▄ ·  ▄▄·       ▄▄▄  ·▄▄▄▄  
                                         ██▪ ██ ██ ▐█ ▀. ▐█ ▌▪▪     ▀▄ █·██▪ ██ 
                                         ▐█· ▐█▌▐█·▄▀▀▀█▄██ ▄▄ ▄█▀▄ ▐▀▀▄ ▐█· ▐█▌
                                         ██. ██ ▐█▌▐█▄▪▐█▐███▌▐█▌.▐▌▐█•█▌██. ██ 
                                         ▀▀▀▀▀• ▀▀▀ ▀▀▀▀ ·▀▀▀  ▀█▄▀▪.▀  ▀▀▀▀▀▀• 
                                         ▄▄▄  ▄▄▄ . ▄▄▄·  ▄▄▄·▄▄▄ .▄▄▄          
                                         ▀▄ █·▀▄.▀·▐█ ▀█ ▐█ ▄█▀▄.▀·▀▄ █·        
                                         ▐▀▀▄ ▐▀▀▪▄▄█▀▀█  ██▀·▐▀▀▪▄▐▀▀▄         
                                         ▐█•█▌▐█▄▄▌▐█ ▪▐▌▐█▪·•▐█▄▄▌▐█•█▌        
                                         .▀  ▀ ▀▀▀  ▀  ▀ .▀    ▀▀▀ .▀  ▀     
                                      
                                       \x1b[33mMade by Internetzugriff ~ @INZG --> Discord\x1b[0m
  `;

  console.log(asciiArt);
}

// Starte den dynamischen Import von Chalk und führe das Skript aus
import('chalk')
  .then((chalkModule) => {
    const chalk = chalkModule.default;
    startScript();
  })
  .catch((error) => {
    console.error('Error loading chalk:', error);
  });

  function startScript() {
    console.clear();
    generateColoredAsciiArt();
    
  
    function askUserId() {
      rl.question('User ID: ', async (userId) => {
        
        try {
          const userData = await fetchDiscordUserData(userId);
  
          if (userData.id) {
            console.log(chalk.green('User found!'));
            console.log('', userData);
            console.log();
            console.log(chalk.red('Are you sure you want to report this user ID?'));
            console.log();
  
            rl.question(chalk.yellow('Start(') + chalk.green('Y') + chalk.yellow('/' + chalk.red('N') + '): '), (startInput) => {
              const startInputUpper = startInput.toUpperCase();
  
              if (startInputUpper === 'Y') {
                console.clear();
                generateColoredAsciiArt();
  
                let reportingInterval;
                let reportingSpeed = getRandomReportingSpeed();
  
                const stopReporting = () => {
                  clearInterval(reportingInterval);
                  console.log(chalk.blue('Successfully stopped!'));
                  startScript();
                };
  
                reportingInterval = setInterval(() => {
                  console.log(chalk.yellow('Reporting...'));
                  const reportStatus = getRandomReportStatus();
                  const reportColor = reportStatus.includes('successfully') ? 'green' : 'red';
                  console.log(chalk[reportColor](reportStatus));
                  console.log(); // Eine Zeile freilassen
  
                  // Ändere die Geschwindigkeit nach zufälliger Zeit
                  if (Math.random() < 0.1) {
                    reportingSpeed = getRandomReportingSpeed();
                    console.log();
                  }
                }, reportingSpeed);
  
                rl.on('line', (input) => {
                  if (input.toLowerCase() === 'stop') {
                    stopReporting();
                  }
                });
  
                rl.on('close', () => {
                  stopReporting();
                });
              } else if (startInputUpper === 'N') {
                askUserId(); // Frage erneut nach der User ID
              } else {
                console.log('Invalid input. Please enter either "Y" or "N".');
                startScript(); // Frage erneut, bis gültige Eingabe (Y/N) erfolgt
              }
            });
          } else {
            console.log(chalk.red('User not found!'));
            askUserId(); // Frage erneut nach der User ID
          }
        } catch (error) {
          console.error('USER NOR FOUND!', error.message);
          askUserId();
        }
      });
    }
  
    askUserId();
  }
  

// Funktion zum Zufälligen Auswählen von "Report successfully!" oder "Report failed!"
const getRandomReportStatus = () => {
  const statuses = ['Report successfully!', 'Report failed!'];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
};

// Starte den dynamischen Import von Chalk und führe das Skript aus
import('chalk')
  .then((chalkModule) => {
    const chalk = chalkModule.default;
    startScript();
  })
  .catch((error) => {
    console.error('Error loading chalk:', error);
  });