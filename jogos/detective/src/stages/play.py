from core.area import Area
from data.tile_types import tile_kinds
from components.entity import Entity
from components.button import Button
from components.label import Label
from core.ending import Ending_Area
from stages.menu import menu
from core.clear import Clear_Area

def right1():
    from core.engine import engine
    engine.switch_to("LevelMedium")

def right2():
    from core.engine import engine
    engine.switch_to("LevelHard")

def wrong():
    from core.engine import engine
    engine.switch_to("GameOver")

def clear():
    from core.engine import engine
    engine.switch_to("ClearGame")

def option():
    from core.engine import engine
    engine.switch_to("LevelEasy")

def travel1():
    from core.engine import engine
    engine.switch_to("Prison1")

def travel2():
    from core.engine import engine
    engine.switch_to("Prison2")

def travel3():
    from core.engine import engine
    engine.switch_to("Prison3")

def play():
    Area("forest.map", tile_kinds)
    Dedução1 = Entity(Label("EBGaramond-ExtraBold.ttf", 
                                         "Deduzir", 40,
                                         (255, 255, 255)))
    
    Deduzir = Dedução1.get(Label).get_bounds()

    Dedução1.add(Button(travel1, Deduzir))

    from core.camera import camera
    Dedução1.x = camera.width/2 - Deduzir.width/2
    Dedução1.y = camera.height - 50


def fase_1():
    Area("forest.map", tile_kinds)
    Dedução1 = Entity(Label("EBGaramond-ExtraBold.ttf", 
                                         "Deduzir", 40,
                                         (255, 255, 255)))
    
    Deduzir = Dedução1.get(Label).get_bounds()

    Dedução1.add(Button(travel1, Deduzir))

    from core.camera import camera
    Dedução1.x = camera.width/2 - Deduzir.width/2
    Dedução1.y = camera.height - 50

def fase_2():
    Area("mansion.map", tile_kinds)
    Dedução2 = Entity(Label("EBGaramond-ExtraBold.ttf", 
                                         "Deduzir", 40,
                                         (255, 255, 255)))
    
    Deduzir = Dedução2.get(Label).get_bounds()

    Dedução2.add(Button(travel2, Deduzir))

    from core.camera import camera
    Dedução2.x = camera.width/2 - Deduzir.width/2
    Dedução2.y = camera.height - 50

def fase_3():
    Area("house.map", tile_kinds)
    Dedução3 = Entity(Label("EBGaramond-ExtraBold.ttf", 
                                         "Deduzir", 40,
                                         (255, 255, 255)))
    
    Deduzir = Dedução3.get(Label).get_bounds()

    Dedução3.add(Button(travel3, Deduzir))

    from core.camera import camera
    Dedução3.x = camera.width/2 - Deduzir.width/2
    Dedução3.y = camera.height - 50

def prison1():
    Area("jail1.map", tile_kinds)

    Palpite1 = Entity(Label("EBGaramond-ExtraBold.ttf", 
                                         "Amanda", 40,
                                         (255, 255, 255)))
    
    Palpite2 = Entity(Label("EBGaramond-ExtraBold.ttf",
                                         "Martin", 40,
                                         (255, 255, 255)))
    
    Palpite3 = Entity(Label("EBGaramond-ExtraBold.ttf",
                                         "Ellen", 40,
                                         (255, 255, 255)))
    
    Prender1 = Palpite1.get(Label).get_bounds()
    Prender2 = Palpite2.get(Label).get_bounds()
    Prender3 = Palpite3.get(Label).get_bounds()

    Palpite1.add(Button(wrong, Prender1))
    Palpite2.add(Button(right1, Prender2))
    Palpite3.add(Button(wrong, Prender3))

    Palpite1.x = 150
    Palpite1.y = 500
    Palpite2.x = 350
    Palpite2.y = 500 
    Palpite3.x = 550
    Palpite3.y = 500

def prison2():
    Area("jail2.map", tile_kinds)

    Palpite4 = Entity(Label("EBGaramond-ExtraBold.ttf", 
                                         "Alfred", 40,
                                         (255, 255, 255)))
    
    Palpite5 = Entity(Label("EBGaramond-ExtraBold.ttf",
                                         "Nicolas", 40,
                                         (255, 255, 255)))
    
    Palpite6 = Entity(Label("EBGaramond-ExtraBold.ttf",
                                         "Edgar", 40,
                                         (255, 255, 255)))
    
    Palpite7 = Entity(Label("EBGaramond-ExtraBold.ttf",
                                         "Bob", 40,
                                         (255, 255, 255)))
    

    
    Prender4 = Palpite4.get(Label).get_bounds()
    Prender5 = Palpite5.get(Label).get_bounds()
    Prender6 = Palpite6.get(Label).get_bounds()
    Prender7 = Palpite7.get(Label).get_bounds()

    Palpite4.add(Button(wrong, Prender4))
    Palpite5.add(Button(right2, Prender5))
    Palpite6.add(Button(wrong, Prender6))
    Palpite7.add(Button(wrong, Prender7))

    Palpite4.x = 30
    Palpite4.y = 500
    Palpite5.x = 240
    Palpite5.y = 500
    Palpite6.x = 450
    Palpite6.y = 500
    Palpite7.x = 650
    Palpite7.y = 500
    
def prison3():
    Area("jail3.map", tile_kinds)

    Palpite8 = Entity(Label("EBGaramond-ExtraBold.ttf", 
                                         "Megan", 40,
                                         (255, 255, 255)))
    
    Palpite9 = Entity(Label("EBGaramond-ExtraBold.ttf",
                                         "Julian", 40,
                                         (255, 255, 255)))
    
    Palpite10 = Entity(Label("EBGaramond-ExtraBold.ttf",
                                         "Ryan", 40,
                                         (255, 255, 255)))
    
    Palpite11 = Entity(Label("EBGaramond-ExtraBold.ttf",
                                         "Carly", 40,
                                         (255, 255, 255)))
    
    Palpite12 = Entity(Label("EBGaramond-ExtraBold.ttf",
                                         "Edward", 40,
                                         (255, 255, 255)))
    
    Prender8 = Palpite8.get(Label).get_bounds()
    Prender9 = Palpite9.get(Label).get_bounds()
    Prender10 = Palpite10.get(Label).get_bounds()
    Prender11 = Palpite11.get(Label).get_bounds()
    Prender12 = Palpite12.get(Label).get_bounds()

    Palpite8.add(Button(wrong, Prender8))
    Palpite9.add(Button(clear, Prender9))
    Palpite10.add(Button(wrong, Prender10))
    Palpite11.add(Button(wrong, Prender11))
    Palpite12.add(Button(wrong, Prender12))

    Palpite8.x = 20
    Palpite8.y = 500
    Palpite9.x = 170
    Palpite9.y = 500
    Palpite10.x = 330
    Palpite10.y = 500
    Palpite11.x = 480
    Palpite11.y = 500
    Palpite12.x = 630
    Palpite12.y = 500

def end():
    Ending_Area("gameover.map", tile_kinds)

    Retornar = Entity(Label("EBGaramond-ExtraBold.ttf", 
                                         "Retornar", 50,
                                         (255, 255, 255)))
    
    Voltar = Retornar.get(Label).get_bounds()

    Retornar.add(Button(menu, Voltar))

    from core.camera import camera
    Retornar.x = camera.width/2 - Voltar.width/2
    Retornar.y = 300

def congratulation():
    Clear_Area("clear.map", tile_kinds)

    Retornar = Entity(Label("EBGaramond-ExtraBold.ttf", 
                                         "Retornar", 50,
                                         (255, 255, 255)))
    
    Voltar = Retornar.get(Label).get_bounds()

    Retornar.add(Button(menu, Voltar))

    from core.camera import camera
    Retornar.x = camera.width/2 - Voltar.width/2
    Retornar.y = 300
