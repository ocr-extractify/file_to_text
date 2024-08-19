# Vercel:

1. Create a project in vercel
2. set "Framework Preset" to "Other"
3. set the env variables.
4. create the `vercel.json` file in `backend` dir

```json
{
  "builds": [
    {
      "src": "main.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "main.py"
    }
  ]
}
```

# References:

[tabnews - fazendo deploy na vercel](https://www.tabnews.com.br/hebertcisco/fazendo-deploy-de-api-pythonfastapi-na-vercel)
[dev.to - deploying fastapi app on vercel serverless](https://dev.to/abdadeel/deploying-fastapi-app-on-vercel-serverless-18b1)
[github - vercel-fastapi-deployment](https://github.com/mabdullahadeel/vercel-fastapi-deployment)