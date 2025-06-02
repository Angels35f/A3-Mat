from components.usable import Usable
from components.physics import Trigger


item_folder_location = "content/itens"

class Item(Usable):
    def __init__(self, obj_name, item_file):
        super().__init__(obj_name)
        self.item_file = item_file

    def on(self, other, distance):
        from components.player import Player
        player = other.get(Player)

        file = open(item_folder_location + "/" + self.item_file, "r")
        data = file.read()
        file.close()
        lines = data.split('\n')
            
        from components.ui.item_view import ItemView
        ItemView(lines, self, player)
