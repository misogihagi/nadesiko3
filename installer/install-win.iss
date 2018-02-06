; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!

#define MyAppName "日本語プログラミング言語なでしこ3"
#define MyAppDir "nadesiko-lang3"
#define MyAppVersion "3.0.25"
#define MyAppPublisher "nadesi.com"
#define MyAppURL "https://nadesi.com/"
#define MyAppExeName "install-win.bat"

[Setup]
; NOTE: The value of AppId uniquely identifies this application.
; Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{A94C1E50-31C0-4875-93EB-4D508E3C3605}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
;AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={pf}\{#MyAppDir}
DisableProgramGroupPage=yes
OutputBaseFilename=setup{#MyAppVersion}
Compression=lzma
SolidCompression=yes

[Languages]
Name: "japanese"; MessagesFile: "compiler:Languages\Japanese.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
Source: ".\install-win.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: ".\start-win.bat"; DestDir: "{app}"; Flags: ignoreversion
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Icons]
Name: "{commonprograms}\{#MyAppName}-インストール"; Filename: "{app}\{#MyAppExeName}"
Name: "{commondesktop}\{#MyAppName}-インストール"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon
Name: "{commonprograms}\{#MyAppName}-実行"; Filename: "{app}\start-win.bat"
Name: "{commondesktop}\{#MyAppName}-実行"; Filename: "{app}\start-win.bat"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent

