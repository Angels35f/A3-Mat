from components.entity import Entity
from components.sprite import Sprite, Animation
from components.player import Player
from components.physics import Body
from components.teleporter import Teleporter
from components.inventory import Inventory, DroppedItem
from data.item_types import item_types
from components.npc import NPC


entity_factories = [
    # 0 - Player
    lambda args: Entity(Player(), 
                        Animation("player_sheetoriginal.png", 32, 64,
                                  frame_coords=[(0, 0)],
                                  frames_per_image =15),
                        Body(8, 48, 16, 16)),

    # 1 - Pine Tree
    lambda args: Entity(Sprite("tree.png"), 
                        Body(16, 96, 32, 32)),      

    # 2 - Small Rock
    lambda args: Entity(Sprite("rock.png"), Body()), 

    # 3 - Teleporter Up
    lambda args: Entity(Teleporter(args[0], args[1], args[2]), Sprite("teleporter_up.png")),

    # 4 - Teleporter Right
    lambda args: Entity(Teleporter(args[0], args[1], args[2]), Sprite("teleporter_right.png")),

    # 5 - Teleporter Down
    lambda args: Entity(Teleporter(args[0], args[1], args[2]), Sprite("teleporter_down.png")),

    # 6 - Teleporter Left
    lambda args: Entity(Teleporter(args[0], args[1], args[2]), Sprite("teleporter_left.png")),

    # 7 - Dropped Item which can only be picked up once
    lambda args: Entity(DroppedItem(item_types[int(args[0])], int(args[1])), 
                        Sprite(item_types[int(args[0])].icon_name)),

    # 8 - NPC
    lambda args: Entity(Sprite(args[1]), NPC(args[0], args[2]), Body(0, 0, 32, 64)),

    # 9 - Pillar
    lambda args: Entity(Sprite("pilar.png"), 
                        Body(16, 96, 32, 32)),

    # 10 - Door
    lambda args: Entity(Sprite("door.png")), 
                        
                      

]


def create_entity(id, x, y, data=None, index=None):
    factory = entity_factories[id]
    e =  factory(data)
    e.index = index
    e.x = x*32
    e.y = y*32
    return e
