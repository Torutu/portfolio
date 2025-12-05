import { CollapsibleSection } from "../../utils/pageContext";

const whatIsPingPong = (
  <>
    <h2 className="rightSideSection__h2">What is Ping Pong?</h2>
    <p className="rightSideSection__p">
      A real-time multiplayer Pong game built for ft_transcendence with WebSocket-powered gameplay. 
      Features 1v1 matches and tournament modes with support for both local and remote play. 
      Players control paddles to hit a ball across a 3D table, with physics-based collision detection, 
      paddle spin mechanics, and automatic scoring. Includes pause functionality, match history tracking, 
      and real-time game state synchronization across connected players.
    </p>
  </>
);

const GameState = (
  <>
    <CollapsibleSection title="Game State Management">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Central data structure that tracks all game information: ball position and velocity, 
        paddle positions, player list, scores, match history, game status, timers, and mode settings. 
        Updated continuously and broadcast to all connected players to keep gameplay synchronized.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        GameState interface contains ball object (x, z coordinates, velocities, color), 
        paddle objects (left and right with z position), player array with names and socket IDs, 
        matches array tracking tournament rounds, status flags (waiting/in-progress/finished/paused), 
        and display strings (timer, score, match info). Updated every frame by PingPongGame class 
        and emitted via Socket.IO to all clients in the game room.
      </p>
    </CollapsibleSection>
  </>
);

const PhysicsEngine = (
  <>
    <CollapsibleSection title="Physics & Ball Movement">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Simulates realistic ball movement with velocity vectors, boundary bouncing, and paddle collisions. 
        Ball moves based on velocity (vx, vz) scaled by delta time. Bounces off top/bottom table edges. 
        Detects paddle hits and applies velocity changes with spin based on paddle position.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        Each frame calculates delta time (dt) from last update. Ball position updated: 
        ball.x += vx * dt, ball.z += vz * dt. If ball exceeds z bounds (±5.6), velocity reverses. 
        Paddle collision checks distance between ball and paddle centers. On hit: velocity reverses 
        and increases by 5% (acceleration), spin calculated from paddle-ball z delta multiplied by 2.0, 
        ball color changes to indicate hitter. Hitter tracking prevents double-scoring.
      </p>
    </CollapsibleSection>
  </>
);

const ScoringAndWinConditions = (
  <>
    <CollapsibleSection title="Scoring & Win Conditions">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Tracks points scored when ball exits table boundaries. First player to 3 points wins. 
        For 1v1 matches, game ends immediately. For tournaments, match continues until round timer 
        expires or max score reached, then determines winner and advances to next round.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        Ball exits left (x less than -9.6): right paddle scores. Ball exits right (x greater than 9.6): 
        left paddle scores. Only counts if valid hitter (prevents self-scoring). Check runs after each 
        frame. If score reaches 3 or timer expires, status changes to "finished". Match result saved 
        with both scores, duration, and winner. For tournaments with tie, coin flip determines winner.
      </p>
    </CollapsibleSection>
  </>
);

const TournamentMode = (
  <>
    <CollapsibleSection title="Tournament Mode">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Manages multi-round bracket tournament with 4 players. Round 1 matches 2 random pairs 
        (players shuffled). Round 2 matches the second pair. Round 3 (finals) matches the 2 winners. 
        Tracks all match results and determines overall tournament winner.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        Round 1: Shuffles player array randomly, creates 2 matches (players 0v1, 2v3). 
        Round 2: Sets up match with existing players 2 and 3. Round 3: Creates final match 
        with winners from rounds 1 and 2. Each round generates match info string and broadcasts 
        to all players. Winner of each match determined by score at time limit, stored in match 
        object for next round advancement.
      </p>
    </CollapsibleSection>
  </>
);

const WebSocketIntegration = (
  <>
    <CollapsibleSection title="WebSocket Communication">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Real-time synchronization between server and all connected players using Socket.IO. 
        Broadcasts game state at 60fps. Handles player input (paddle movement), ready signals, 
        pause requests, and match restarts. Manages room connections and disconnections.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        Players join via "join_game_room" or "join_tournament_room" events, emit names for validation. 
        Server emits "stateUpdate" 60 times per second with full game state. Clients send "move" events 
        with paddle position updates. "setReady" waits for both players before starting. Game status 
        changes and pause/resume events broadcast immediately. "disconnect" event cleans up player slot 
        and resets room if empty. All updates routed through specific game room namespace.
      </p>
    </CollapsibleSection>
  </>
);

const PlayerInputHandling = (
  <>
    <CollapsibleSection title="Player Input & Paddle Control">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Receives real-time paddle movement input from players (both local and remote). 
        Updates paddle z-position (vertical) based on input. Left and right paddles updated independently 
        without artificial latency.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        Client sends "move" event with side (left/right) and positionZ value. Server receives and 
        immediately updates gameRoom.state.leftPaddle.z or gameRoom.state.rightPaddle.z. No validation 
        of bounds (handled on client for responsiveness). For local play, both players controlled 
        via keyboard, input sent from same client. For remote, each client sends only their paddle position.
      </p>
    </CollapsibleSection>
  </>
);

const PauseAndResume = (
  <>
    <CollapsibleSection title="Pause & Resume Functionality">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Pauses active game, clears game loop interval, saves game time state. 
        Resumes with adjusted timer so elapsed pause time doesn't count against game duration.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p_end">
        Pause: Records current timestamp in whenPaused, clears interval, sets status to "paused". 
        Resume: Calculates pause duration (now - whenPaused), adds to gameEndTime so timer resumes 
        correctly. Restarts game loop. Only works in local mode (toggle controlled by one client). 
        Status broadcast to clients to show "PAUSED" message.
      </p>
    </CollapsibleSection>
  </>
);

const DisconnectionHandling = (
  <>
    <CollapsibleSection title="Disconnection Handling">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Removes disconnected player from game. Cleans up game room if empty or if only local players remain. 
        For tournaments, prevents rejoining if match already started (unless local mode). 
        Notifies remaining players of disconnection.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        On disconnect event, finds player by socket.id and removes from player array. 
        If players.length drops below 2, clears game loop and resets status to waiting. 
        For tournaments: checks canLeaveTournament() to prevent reconnection mid-match in remote mode. 
        Emits "disconnection" event to room if tournament becomes unplayable. Removes game room from 
        global pongRooms/pongTournaments array if empty. Updates lobby for other waiting players.
      </p>
    </CollapsibleSection>
  </>
);

const featureBreakdown = (
  <>
    <h1 className="rightSideSection__h1">Features</h1>
    {GameState}
    {PhysicsEngine}
    {ScoringAndWinConditions}
    {TournamentMode}
    {WebSocketIntegration}
    {PlayerInputHandling}
    {PauseAndResume}
    {DisconnectionHandling}
  </>
);

export const pingpongContent = (
  <>
    <h1 className="rightSide__h">Ping Pong Game</h1>
    {whatIsPingPong}
    {featureBreakdown}
  </>
);
