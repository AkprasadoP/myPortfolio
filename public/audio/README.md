# Audio mixtape folder

Drop **royalty-free / CC0 / self-licensed** audio files here for the site mixtape player.

## Expected format

- Prefer `.mp3` or `.ogg`
- Keep files reasonably small
- Update the track list in `src/components/MixtapePlayer.jsx` (`TRACKS` array)

Example:

```js
{ id: "night-shift", title: "Night Shift Debug", src: "/audio/night-shift.mp3" }
```

## Do not

- Commit copyrighted music, commercial tracks, or lyrics you do not have rights to use
- Enable autoplay with downloaded files in production without checking license terms

The player ships with autoplay **off**.
