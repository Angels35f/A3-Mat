from core.map import Map
from components.sprite import Sprite
from components.entity import Entity

area = None
map_folder_location = "content/maps"

class Clear_Area:
    def __init__(self, area_file, tile_types):
        global area
        area = self
        self.tile_types = tile_types
        self.load_file(area_file)

    def search_for_first(self, kind):
        for e in self.entities:
            c = e.get(kind)
            if c is not None:
                return e
            
    def remove_entity(self, e):
        self.entities.remove(e)
        for c in e.components:
            g = getattr(c, "breakdown", None)
            if callable(g):
                c.breakdown()

    def load_file(self, area_file):
        from core.engine import engine
        
        engine.reset()

        # Read all the data from the file
        file = open(map_folder_location + "/" + area_file, "r")
        data = file.read()
        file.close()
        self.name = area_file.split(".")[0].title().replace("_", " ")


        # Split up the data by minus signs
        chunks = data.split('-')
        tile_map_data = chunks[0]

        # Load the map
        self.map = Map(tile_map_data, self.tile_types)
        
        Entity(Sprite("Clear.png", is_ui=True))