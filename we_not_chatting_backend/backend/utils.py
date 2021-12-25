from typing import Dict, Any, Tuple


def check_choose(data: Dict[str, Any], any_of: Tuple):
    for r in any_of:
        if r not in data:
            return True

    return False
