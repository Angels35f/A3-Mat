import asyncio
import websockets
import json

# Variables do jogo
x = 450
y = 300
velocidade = 10

async def game_logic(websocket):
    global x, y
    print("Cliente conectado")
    try:
        while True:
            # Recibir comandos do cliente
            message = await websocket.recv()
            comandos = json.loads(message)

            # Actualizar as coordeadas com os comandos
            if comandos.get("up"):
                y -= velocidade
            if comandos.get("down"):
                y += velocidade
            if comandos.get("right"):
                x += velocidade
            if comandos.get("left"):
                x -= velocidade

            # Enviar o estado do jogo ao cliente
            state = {"x": x, "y": y}
            await websocket.send(json.dumps(state))
    except websockets.ConnectionClosed:
        print("Conexión cerrada")
    except Exception as e:
        print(f"Error: {e}")

# Iniciar o servidor com WebSocket
async def main():
    async with websockets.serve(game_logic, "localhost", 8765):
        print("Servidor WebSocket iniciado en ws://localhost:8765")
        await asyncio.Future()  

asyncio.run(main())