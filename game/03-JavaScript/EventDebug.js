/*  Jimmy: Blueprint for event structure, packaged for convenience.
 *  $event = {
 *      buffer = [] : EventNPC, refer to below
 *      schema = 1 : Integer, defines the current version on the save, useful for update tracking.
 *  }
 * 
 *  EventNPC = {
 *      slot: Where the NPC is positioned in NPCList.   
 *              EG: 0       $NPCList[0]
 *      time: The time the NPC was generated.           
 *              EG: 805     13:48 / 1:48pm
 *      area: Where it was generated.                   
 *              EG: ['::Alleyways', 'eventsstreet', 'eventday', 'street8']
 *                      Passage        Widget 1      Widget 2    Widget 3
 *  }
 */

/**
 * Handles event data for NPC objects for debugging.
 * @module EventData
 */
class EventData {
    constructor() {
        this.disable = false;
    }

    Push(passage, index, time) {
        if (this.disable) return;
        V.event = ensure(V.event, {
            buffer: [],
            schema: 1
        });
        V.event.buffer.push({
            slot: index, // TODO: Remove in favour of direct insertion. (Nvm)
            time: time,
            area: [passage, ...DOL.Stack.slice(0, -1)]
        });
    }

    Pop(index) {
        if (this.disable) return;
        if (V.event) {
            V.event.buffer = V.event.buffer.filter(e => e.slot !== index); // TODO: Splice backwards instead.
            if (V.event.buffer.length === 0) {
                this.Clear();
            }
        }
    }

    Get(index) {
        if (V.event) {
            return V.event.buffer.find(e => e.slot === index);
        }
        return undefined;
    }

    GetEvery(index) {
        if (V.event) {
            return V.event.buffer.filter(e => e.slot === index);
        }
        return [];
    }

    Clear()  {
        if (this.disable) return;
        delete V.event;
    }

    Update() {
        if (V.event == undefined) {
            return;
        }
        // Check if $event contains schema
        switch (V.event.schema) {
            case 1:
                // No need for updates.
                return;
            default:
                // Update to newer schema (1 atm).
                // .event ['Farm Work', 'Farm Work', 'Farm Work', 'Farm Work'] 
                // .eventtime [497, 497, 497, 497]
                // .eventslot [0, 1, 2, 3]
                const event = [...V.event];
                V.event = {
                    buffer: [],
                    schema: 1
                };
                for (let i = 0; i < event.length; i++) {
                    this.Push(event[i], V.eventslot[i], V.eventtime[i])
                }
                delete V.eventtime;
                delete V.eventslot;
                return;
        }
    }

    IsSlotTaken(index) {
        if (V.event == undefined) return false;
        return V.event.buffer.some(e => e.slot === index);
    }

    get Disable() {
        return this.disable;
    }

    set Disable(value) {
        if (typeof value === 'boolean') {
            this.disable = value;
        } else {
            console.debug('EventData.disable set with unexpected data-type, requires boolean.');
        }
    }
};

// Jimmy: Potentially flawed design style, static class basically.
// But ends up being just an extended function in reality. (Not actually tho)
window.EventSystem = new EventData();
