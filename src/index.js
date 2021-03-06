// @flow
// An event handler can take an optional event argument
// and should not return a value
type EventHandler = (event?: any, ...args: any[]) => void;
type WildCardEventHandler = (type: string, event?: any) => void

// An array of all currently registered event handlers for a type
type EventHandlerList = Array<EventHandler>;
type WildCardEventHandlerList = Array<WildCardEventHandler>;
// A map of event types and their corresponding event handlers.
type EventHandlerMap = {
  '*'?: WildCardEventHandlerList,
  [type: string]: EventHandlerList,
};

/** EMitt: Tiny (~225b) functional event emitter / pubsub.
 *  @name emitt
 *  @returns {Emitt}
 */
export default function emitt(all: EventHandlerMap) {
	all = all || Object.create(null);

	return {
		/**
		 * Register an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to listen for, or `"*"` for all events
		 * @param  {Function} handler Function to call in response to given event
		 * @memberOf emitt
		 */
		on(type: string, handler: EventHandler) {
			(all[type] || (all[type] = [])).push(handler);
		},

		/**
		 * Remove an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
		 * @param  {Function} handler Handler function to remove
		 * @memberOf emitt
		 */
		off(type: string, handler: EventHandler) {
			if (all[type]) {
				all[type].splice(all[type].indexOf(handler) >>> 0, 1);
			}
		},

		/**
		 * Invoke all handlers for the given type.
		 * If present, `"*"` handlers are invoked after type-matched handlers.
		 *
		 * @param {String} type  The event type to invoke
		 * @param {any[]} [...event_args]  Any values (object is recommended and powerful), passed to each handler
		 * @memberOf emitt
		 */
		emit(type: string) {
			const args = [].slice.call(arguments, 1);

			(all[type] || []).map((handler) => { handler(...args); });
			(all['*'] || []).map((handler) => { handler(type, ...args); });
		}
	};
}
