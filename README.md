## AI BIMBOllo

### Setup

1. Install frontend dependencies:

```bash
npm install
```

2. Configure backend connection:
- Open `config.ts` file
- Update the backend URL if needed (default is usually `http://localhost:5000`)

3. Set up environment variables:
- Create a `.env` file in the root directory
- Add your Google Maps API key:
```
GM_API_KEY=your_google_maps_api_key_here
```
- You can get a Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com/):
  - Create a new project or select an existing one
  - Enable the Maps JavaScript API
  - Create credentials (API key)
  - Make sure to enable billing for the project

4. Start the Flask backend:
```bash
cd backend
pip install -r requirements.txt
python app.py
```

5. Run development server:
```bash
npm run dev
```

6. Open in browser:
[http://localhost:3000](http://localhost:3000)
