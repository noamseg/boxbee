# User Stories: EPIC-001 - Spotify Integration for Focus Mode

## Epic Context
**Epic**: Spotify Integration for Focus Mode
**Epic ID**: EPIC-001
**Priority**: High
**Dependencies**: None
**Business Value**: Increase focus session quality and completion rate

---

## Story 1: Connect Spotify Account

### Story Details
**Story ID**: BB-011
**Title**: As a user, I want to connect my Spotify account so I can play focus music
**Priority**: P0 (Critical)
**Story Points**: 5
**Sprint**: Sprint 1

### User Story
```
As a BoxBee user who uses Spotify
I want to connect my Spotify account
So that I can play focus music during my time boxes
```

### Acceptance Criteria
- [ ] "Connect Spotify" button in Settings > Integrations
- [ ] Tapping button opens Spotify OAuth flow in browser
- [ ] User authenticates and approves permissions
- [ ] App receives OAuth token and stores securely
- [ ] Success message: "Spotify connected! 🎵"
- [ ] Connection status visible: "Connected as [Spotify Username]"
- [ ] "Disconnect" button to remove connection
- [ ] Error handling: OAuth cancelled, network errors, token expired
- [ ] Works on both iOS and Android

### Technical Notes
- OAuth Flow: Authorization Code with PKCE
- Required Scopes:
  ```
  - streaming (control playback)
  - user-read-playback-state (get current playback)
  - user-modify-playback-state (play/pause/skip)
  - playlist-read-private (access user playlists)
  - user-library-read (access saved songs)
  ```
- Backend endpoint: `POST /api/integrations/spotify/auth`
- Database schema:
  ```sql
  ALTER TABLE users ADD COLUMN spotify_user_id TEXT;
  ALTER TABLE users ADD COLUMN spotify_access_token TEXT;
  ALTER TABLE users ADD COLUMN spotify_refresh_token TEXT;
  ALTER TABLE users ADD COLUMN spotify_token_expires_at TIMESTAMP;
  ```
- Token refresh: Implement automatic refresh before expiry
- SDK: `spotify-web-api-node` for backend

### OAuth Flow
```
1. User taps "Connect Spotify"
2. App opens: https://accounts.spotify.com/authorize?
   - client_id
   - response_type=code
   - redirect_uri=boxbee://spotify-callback
   - scope=streaming user-read-playback-state...
3. User approves in Spotify
4. Redirect to boxbee://spotify-callback?code=ABC123
5. App sends code to backend
6. Backend exchanges code for access_token + refresh_token
7. Store tokens in database (encrypted)
8. Return success to app
```

### Definition of Done
- [ ] Spotify OAuth implemented and working
- [ ] Tokens stored securely (encrypted)
- [ ] Connection status UI complete
- [ ] Disconnect functionality working
- [ ] Error handling for all edge cases
- [ ] Token refresh logic implemented
- [ ] Unit tests for OAuth flow
- [ ] Integration test with Spotify API
- [ ] QA tested on iOS and Android
- [ ] Spotify app approval obtained

---

## Story 2: Auto-Play Focus Music

### Story Details
**Story ID**: BB-012
**Title**: As a user, I want my focus music to start automatically when I begin a box
**Priority**: P0 (Critical)
**Story Points**: 8
**Sprint**: Sprint 1
**Dependencies**: BB-011

### User Story
```
As a user who wants seamless focus sessions
I want my selected playlist to auto-play when I start a box
So that I can immediately get into the zone
```

### Acceptance Criteria
- [ ] When box starts, Spotify begins playing selected playlist
- [ ] Works if Spotify app installed (native playback preferred)
- [ ] Fallback to web playback if app not available
- [ ] "Auto-play music" toggle in Settings (default: ON)
- [ ] First-time user: Prompt to select focus playlist
- [ ] Handles edge cases: Spotify not connected, premium required, device offline
- [ ] Playback starts within 2 seconds of box start
- [ ] Volume respects user's last Spotify volume setting
- [ ] Background playback continues even if BoxBee minimized

### Technical Notes
- Spotify SDK Integration:
  - iOS: `SpotifyiOS.framework` for native playback
  - Android: Spotify Android SDK
  - Web fallback: Spotify Web Playback SDK
- Playback trigger:
  ```typescript
  // When box status changes to 'active'
  async function startBox(boxId: string) {
    const box = await prisma.box.update({
      where: { id: boxId },
      data: { status: 'active', startTime: new Date() }
    });

    // Trigger music if enabled
    const user = await prisma.user.findUnique({
      where: { id: box.userId },
      select: {
        spotifyAccessToken: true,
        preferredFocusPlaylist: true,
        autoPlayMusic: true
      }
    });

    if (user.autoPlayMusic && user.spotifyAccessToken) {
      await spotifyService.play({
        userId: box.userId,
        playlistId: user.preferredFocusPlaylist,
        deviceId: user.spotifyDeviceId
      });
    }
  }
  ```
- Premium requirement: Spotify API requires Premium for playback control
- Error messages:
  - "Spotify Premium required for playback"
  - "Connect Spotify in Settings to enable music"
  - "Unable to connect to Spotify. Try again?"

### Premium Check Flow
```typescript
async function checkSpotifyPremium(accessToken: string): Promise<boolean> {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  const user = await response.json();
  return user.product === 'premium';
}
```

### Definition of Done
- [ ] Auto-play works when box starts
- [ ] Settings toggle functional
- [ ] Premium check implemented
- [ ] Native SDK integrated (iOS + Android)
- [ ] Web playback fallback working
- [ ] Background playback enabled
- [ ] Error handling for all scenarios
- [ ] Playback latency <2 seconds
- [ ] Unit tests for playback logic
- [ ] Integration tests with Spotify API
- [ ] QA verified on devices with/without Spotify app

---

## Story 3: Focus Playlist Selection

### Story Details
**Story ID**: BB-013
**Title**: As a user, I want to choose my preferred focus playlist
**Priority**: P0 (Critical)
**Story Points**: 5
**Sprint**: Sprint 2
**Dependencies**: BB-011

### User Story
```
As a user with specific music preferences
I want to select which playlist plays during focus
So that I can listen to music that actually helps me concentrate
```

### Acceptance Criteria
- [ ] "Focus Playlist" setting in Settings > Integrations > Spotify
- [ ] Tapping opens playlist selector with user's playlists
- [ ] Shows: playlist name, image, track count
- [ ] Search functionality to filter playlists
- [ ] Spotify's curated focus playlists also shown (recommended)
- [ ] Selected playlist saved to user profile
- [ ] Preview button to hear 30-second sample
- [ ] "Change playlist" option in active box screen
- [ ] Default: Spotify's "Deep Focus" playlist if user hasn't selected

### Technical Notes
- Endpoint: `GET /api/integrations/spotify/playlists`
- Fetch user playlists:
  ```typescript
  async function getUserPlaylists(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { spotifyAccessToken: true }
    });

    const response = await spotifyApi.getUserPlaylists(user.spotifyAccessToken, {
      limit: 50
    });

    return response.body.items.map(playlist => ({
      id: playlist.id,
      name: playlist.name,
      imageUrl: playlist.images[0]?.url,
      trackCount: playlist.tracks.total,
      uri: playlist.uri
    }));
  }
  ```
- Include curated playlists:
  ```typescript
  const curatedPlaylists = [
    { id: '37i9dQZF1DWZeKCadgRdKQ', name: 'Deep Focus' },
    { id: '37i9dQZF1DX4sWSpwq3LiO', name: 'Peaceful Piano' },
    { id: '37i9dQZF1DWXe9gFZP0gtP', name: 'Brain Food' },
    { id: '37i9dQZF1DX0r3x8OtiwEM', name: 'Focus Flow' }
  ];
  ```
- Storage: `UPDATE users SET preferred_focus_playlist = $1 WHERE id = $2`

### UI Design
```
┌─────────────────────────────────────────┐
│ Select Focus Playlist          [Search] │
├─────────────────────────────────────────┤
│ Recommended                             │
│                                         │
│ [🎵] Deep Focus                    ►    │
│      Spotify · 253 songs                │
│                                         │
│ [🎵] Brain Food                    ►    │
│      Spotify · 175 songs                │
│                                         │
│ Your Playlists                          │
│                                         │
│ [🎵] Lo-Fi Study Beats ✓          ►    │
│      You · 87 songs                     │
│                                         │
│ [🎵] Classical Focus              ►    │
│      You · 42 songs                     │
└─────────────────────────────────────────┘
```

### Definition of Done
- [ ] Playlist selector UI implemented
- [ ] User playlists fetched from Spotify
- [ ] Curated playlists shown as recommendations
- [ ] Search/filter working
- [ ] Preview playback functional
- [ ] Selected playlist saved
- [ ] Default playlist set for new users
- [ ] Quick change during active box
- [ ] Unit tests for playlist fetching
- [ ] QA verified playlist selection persists

---

## Story 4: Auto-Pause on Box Complete

### Story Details
**Story ID**: BB-014
**Title**: As a user, I want music to pause when my box timer completes
**Priority**: P1 (High)
**Story Points**: 3
**Sprint**: Sprint 2
**Dependencies**: BB-012

### User Story
```
As a user finishing a focus session
I want the music to automatically pause
So that I know my box is complete and can take a break
```

### Acceptance Criteria
- [ ] Music pauses when box status changes to 'completed'
- [ ] Also pauses when box is manually stopped
- [ ] Does NOT pause if user skips to next box immediately
- [ ] Setting: "Auto-pause music" toggle (default: ON)
- [ ] Smooth fade-out (1 second) instead of abrupt stop
- [ ] Visual feedback: "Focus session complete! 🎉" notification
- [ ] Music resumes if user starts next box within 5 minutes
- [ ] Handles edge case: Box completed but Spotify already paused by user

### Technical Notes
- Pause trigger:
  ```typescript
  async function completeBox(boxId: string) {
    const box = await prisma.box.findUnique({
      where: { id: boxId },
      include: { user: true }
    });

    await prisma.box.update({
      where: { id: boxId },
      data: {
        status: 'completed',
        endTime: new Date(),
        actualDuration: calculateDuration(box.startTime, new Date())
      }
    });

    // Auto-pause music if enabled
    if (box.user.autoPauseMusic && box.user.spotifyAccessToken) {
      await spotifyService.pause({
        userId: box.userId,
        fadeOut: true,
        duration: 1000 // 1 second fade
      });
    }

    // Send notification
    await notificationService.send({
      userId: box.userId,
      title: 'Focus session complete!',
      body: `Great job! You completed "${box.name}"`,
      icon: '🎉'
    });
  }
  ```
- Fade-out implementation:
  ```typescript
  async function fadeOutAndPause(userId: string) {
    const currentVolume = await spotifyApi.getMyCurrentPlaybackState();
    const startVolume = currentVolume.device.volume_percent;
    const steps = 10;
    const stepDuration = 100; // 100ms per step = 1 second total

    for (let i = steps; i >= 0; i--) {
      const volume = Math.floor((i / steps) * startVolume);
      await spotifyApi.setVolume(volume);
      await sleep(stepDuration);
    }

    await spotifyApi.pause();
    await spotifyApi.setVolume(startVolume); // Restore for next time
  }
  ```

### Definition of Done
- [ ] Auto-pause on completion working
- [ ] Fade-out smooth and consistent
- [ ] Settings toggle functional
- [ ] Notification sent on completion
- [ ] Edge cases handled (already paused, etc.)
- [ ] Resume logic if next box starts soon
- [ ] Unit tests for pause logic
- [ ] User testing confirms good UX
- [ ] QA verified timing accurate

---

## Story 5: In-App Playback Controls

### Story Details
**Story ID**: BB-015
**Title**: As a user, I want to control music playback (play/pause/skip) within BoxBee
**Priority**: P1 (High)
**Story Points**: 5
**Sprint**: Sprint 2
**Dependencies**: BB-012

### User Story
```
As a user who wants control without switching apps
I want to control Spotify playback from within BoxBee
So that I don't have to context switch during focus
```

### Acceptance Criteria
- [ ] Mini player bar appears when music is playing
- [ ] Shows: current track name, artist, album art
- [ ] Controls: play/pause, skip forward, skip back
- [ ] Tap bar to expand full player view
- [ ] Full player shows: progress bar, volume slider, playlist info
- [ ] Playback state syncs with Spotify app in real-time
- [ ] Volume control adjusts Spotify volume
- [ ] "Open in Spotify" button for advanced controls
- [ ] Minimized state when box not active

### Technical Notes
- Component structure:
  ```typescript
  <MiniPlayer>
    <TrackInfo>
      <AlbumArt src={currentTrack.albumArt} />
      <TrackDetails>
        <TrackName>{currentTrack.name}</TrackName>
        <ArtistName>{currentTrack.artists[0].name}</ArtistName>
      </TrackDetails>
    </TrackInfo>
    <PlaybackControls>
      <SkipBackButton />
      <PlayPauseButton />
      <SkipForwardButton />
    </PlaybackControls>
  </MiniPlayer>
  ```
- Playback state polling:
  ```typescript
  // Poll every 5 seconds for playback state
  useEffect(() => {
    const interval = setInterval(async () => {
      const state = await spotifyService.getCurrentPlayback(userId);
      setCurrentTrack(state.item);
      setIsPlaying(state.is_playing);
      setProgress(state.progress_ms);
    }, 5000);

    return () => clearInterval(interval);
  }, [userId]);
  ```
- Controls API:
  ```typescript
  await spotifyApi.play(); // Resume
  await spotifyApi.pause(); // Pause
  await spotifyApi.skipToNext(); // Next track
  await spotifyApi.skipToPrevious(); // Previous track
  await spotifyApi.seek(positionMs); // Seek to position
  await spotifyApi.setVolume(volumePercent); // 0-100
  ```

### UI Design - Mini Player
```
┌─────────────────────────────────────────┐
│ [Album]  Lo-Fi Study Beat #42      ⏸ ⏭  │
│          Chillhop Music                  │
└─────────────────────────────────────────┘
```

### UI Design - Full Player
```
┌─────────────────────────────────────────┐
│                                     ✕   │
│        [Large Album Art]                │
│                                         │
│    Lo-Fi Study Beat #42                 │
│    Chillhop Music                       │
│                                         │
│    ────●─────────────── 2:34 / 3:21    │
│                                         │
│         ⏮   ⏸   ⏭                       │
│                                         │
│    🔊 ──────●────────── 60%            │
│                                         │
│    [Open in Spotify]                    │
└─────────────────────────────────────────┘
```

### Definition of Done
- [ ] Mini player UI implemented
- [ ] Full player modal working
- [ ] All playback controls functional
- [ ] Real-time sync with Spotify
- [ ] Progress bar accurate
- [ ] Volume control working
- [ ] "Open in Spotify" deep link
- [ ] Animations smooth (expand/collapse)
- [ ] Unit tests for playback controls
- [ ] QA tested all controls on both platforms

---

## Additional Stories (Future Backlog)

### Backlog Stories
**BB-016**: Multiple playlist support (different playlists for different times of day)
**BB-017**: Music analytics (which playlists correlate with highest completion rates)
**BB-018**: Smart shuffle (AI picks songs based on task type)
**BB-019**: Offline mode (download playlists for offline focus)
**BB-020**: Apple Music integration (alternative to Spotify)

---

## Story Dependencies Graph

```
BB-011 (Connect Spotify)
   ├──→ BB-012 (Auto-play) ──→ BB-014 (Auto-pause)
   │                       └──→ BB-015 (Controls)
   └──→ BB-013 (Playlist selection)
```

---

## Sprint Planning

### Sprint 1 (2 weeks)
- BB-011: Connect Spotify account
- BB-012: Auto-play focus music
- **Goal**: Users can connect Spotify and have music auto-play

### Sprint 2 (2 weeks)
- BB-013: Playlist selection
- BB-014: Auto-pause on complete
- BB-015: In-app playback controls
- **Goal**: Complete Spotify integration with full control

---

## Testing Plan

### Unit Tests
- OAuth flow: Token exchange, refresh, error handling
- Playback triggers: Start box → play music, complete → pause
- Playlist fetching: User playlists + curated lists
- Fade-out logic: Volume steps, timing

### Integration Tests
- End-to-end: Connect account → Select playlist → Start box → Music plays
- Token refresh: Expired token automatically refreshes
- Cross-app sync: Spotify app and BoxBee stay in sync

### Device Testing
- iOS: With Spotify app, without Spotify app (web fallback)
- Android: With Spotify app, without Spotify app
- Premium vs Free: Verify Premium requirement messaging
- Background playback: Music continues when app minimized
- Bluetooth: Works with AirPods, car audio, speakers

### User Acceptance Testing
- 15 beta users test Spotify integration for 2 weeks
- Metrics: % of boxes with music, completion rate with vs without music
- Success criteria: 80%+ find music integration valuable
- Collect feedback on playlist selection and controls UX

---

## Technical Considerations

### Spotify API Quotas
- Rate limits:
  - Web API: Standard rate limiting (burst: 180 requests/minute)
  - Playback SDK: No strict limits but monitor usage
- Optimization:
  - Cache playlist data (refresh every 24 hours)
  - Batch requests where possible
  - Poll playback state every 5s (not continuous)

### Premium Requirement
- Spotify API playback control requires Premium subscription
- Free users: Show upgrade prompt
  - "Spotify Premium required for playback"
  - "Upgrade to Premium to unlock focus music" → Link to Spotify
- Alternative: Suggest free focus music apps or YouTube Music

### Battery Impact
- Background audio uses battery
- Mitigation:
  - Use native SDKs (more efficient than web playback)
  - Pause when box not active
  - User education: "Music playback may impact battery life"

---

**Document End**
