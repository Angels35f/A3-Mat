from core.engine import Engine
from stages.menu import menu
from stages.play import play
from stages.play import fase_1, fase_2, fase_3
from stages.play import prison1, prison2, prison3
from stages.select_level import select
from stages.play import end
from stages.play import congratulation


e = Engine("Own Case")
e.register("Menu", menu)
e.register("Play", play)
e.register("SelectLevel", select)
e.register("LevelEasy", fase_1)
e.register("LevelMedium", fase_2)
e.register("LevelHard", fase_3)
e.register("Prison1", prison1)
e.register("Prison2", prison2)
e.register("Prison3", prison3)
e.register("GameOver", end)
e.register("ClearGame", congratulation)
e.switch_to("Menu")
e.run()