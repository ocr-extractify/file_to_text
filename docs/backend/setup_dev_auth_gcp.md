To set up Application Default Credentials (ADC) for use by Cloud Client Libraries, Google API Client Libraries, and the REST and RPC APIs in a variety of environments. You set up ADC by providing credentials to ADC in the environment where your code is running.

Application Default Credentials (ADC) is a strategy used by the authentication libraries to automatically find credentials based on the application environment. The authentication libraries make those credentials available to Cloud Client Libraries and Google API Client Libraries. When you use ADC, your code can run in either a development or production environment without changing how your application authenticates to Google Cloud services and APIs.

To configure ADC with a Google Account, you use the Google Cloud CLI:

1. Install the Google Cloud CLI, then initialize it by running the following command:

```bash
gcloud init
```

2. gcloud auth application-default login

```bash
gcloud auth application-default login
```

After you sign in, your credentials are stored in the local credential file used by ADC 
- windows: %APPDATA%\gcloud\application_default_credentials.json
- Linux, MacOS: Linux, macOS: $HOME/.config/gcloud/application_default_credentials.json
  
This prevent of you creating a service account and storing it in the project dir.

# References

[Set up Application Default Credentials](https://cloud.google.com/docs/authentication/provide-credentials-adc)
[adc location](https://cloud.google.com/docs/authentication/application-default-credentials#personal)