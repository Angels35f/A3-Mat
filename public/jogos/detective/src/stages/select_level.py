from components.entity import Entity
from components.button import Button
from components.label import Label
from components.sprite import Sprite

def level_easy():
    from core.engine import engine
    engine.switch_to("LevelEasy")

def level_medium():
    from core.engine import engine
    engine.switch_to("LevelMedium")

def level_hard():
    from core.engine import engine
    engine.switch_to("LevelHard")

def select():
    Entity(Sprite("Plano_Fundo.png", is_ui=True))

    Level_1 = Entity(Label("EBGaramond-ExtraBold.ttf", 
                                         "Level 1", 40,
                                         (255, 255, 255)))
    
    Level_2 = Entity(Label("EBGaramond-ExtraBold.ttf",
                                         "Level 2", 40,
                                         (255, 255, 255)))
                                    
    Level_3 = Entity(Label("EBGaramond-ExtraBold.ttf", 
                                         "Level 3", 40,
                                         (255, 255, 255)))
    
    one_button_size = Level_1.get(Label).get_bounds()
    two_button_size = Level_2.get(Label).get_bounds()
    three_button_size = Level_3.get(Label).get_bounds()
    

    Level_1.add(Button(level_easy, one_button_size))
    Level_2.add(Button(level_medium, two_button_size))
    Level_3.add(Button(level_hard, three_button_size))

    from core.camera import camera
    Level_1.x = camera.width/2 - one_button_size.width/2
    Level_1.y = camera.height - 250
    Level_2.x = camera.width/2 - two_button_size.width/2
    Level_2.y = camera.height - 170
    Level_3.x = camera.width/2 - three_button_size.width/2
    Level_3.y = camera.height - 90


    