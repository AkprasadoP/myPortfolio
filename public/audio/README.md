# Audio mixtape folder

MP3 tracks for the site Walkman player. Keep the `TRACKS` list in
`src/components/MixtapePlayer.jsx` in sync with files here.

## Expected format

- Prefer `.mp3` or `.ogg`
- Keep files reasonably small

Example:

```js
{ id: "night-shift", title: "Night Shift Debug", src: "/audio/night-shift.mp3" }
```

The player ships with autoplay **off**.
