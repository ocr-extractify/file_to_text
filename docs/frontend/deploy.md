# Vercel:

1. Create a project in vercel
2. set "Framework Preset" to "Vite"
3. set the env variables.
   You need to set only the `VITE_API_ENDPOINT_PRODUCTION` key, which is the backend vercel project uri. 
4. create the `vercel.json` file in `frontend` dir 

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

This will redirect all requests to index.html. This prevents 404 errors on page refresh. This logic is also applied to bare-metal/VM servers, where you need to redirect all endpoints to `index.html`.