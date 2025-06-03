from components.entity import Entity
from components.button import Button
from components.label import Label
from components.sprite import Sprite

def new_game():
    from core.engine import engine
    engine.switch_to("Play")

def level_select():
    from core.engine import engine
    engine.switch_to("SelectLevel")

def quit_game():
    from core.engine import engine
    engine.running = False

def menu():
    
    Entity(Sprite("Plano_Fundo.png", is_ui=True))

    new_game_button = Entity(Label("Protest_Demo.ttf", 
                                         "New Game", 40,
                                         (255, 255, 255)))
    
    level_select_button = Entity(Label("Protest_Demo.ttf",
                                         "LeveL SeLect", 40,
                                         (255, 255, 255)))
                                    
    quit_game_button = Entity(Label("Protest_Demo.ttf", 
                                         "Quit Game", 40,
                                         (255, 255, 255)))
    
    new_button_size = new_game_button.get(Label).get_bounds()
    level_select_button_size = level_select_button.get(Label).get_bounds()
    quit_button_size = quit_game_button.get(Label).get_bounds()
    

    new_game_button.add(Button(new_game, new_button_size))
    level_select_button.add(Button(level_select, level_select_button_size))
    quit_game_button.add(Button(quit_game, quit_button_size))

    from core.camera import camera
    new_game_button.x = camera.width/2 - new_button_size.width/2
    new_game_button.y = camera.height - 250
    level_select_button.x = camera.width/2 - level_select_button_size.width/2
    level_select_button.y = camera.height - 170
    quit_game_button.x = camera.width/2 - quit_button_size.width/2
    quit_game_button.y = camera.height - 90