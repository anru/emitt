declare var emitt: emitt.EMittStatic;

export = emitt;

export as namespace emitt;

declare namespace emitt {
  type Handler = (event?: any) => void;
  type WildcardHandler = (type?: string, event?: any) => void;

  interface EMittStatic {
    (all?: {[key: string]: Handler}): Emitter;
  }

  interface Emitter {
    /**
     * Register an event handler for the given type.
     *
     * @param {string} type Type of event to listen for, or `"*"` for all events.
     * @param {Handler} handler Function to call in response to the given event.
     *
     * @memberOf Emitt
     */
    on(type: string, handler: Handler): void;
    on(type: "*", handler: WildcardHandler): void;

    /**
     * Function to call in response to the given event
     *
     * @param {string} type Type of event to unregister `handler` from, or `"*"`
     * @param {Handler} handler Handler function to remove.
     *
     * @memberOf Emitt
     */
    off(type: string, handler: Handler): void;
    off(type: "*", handler: WildcardHandler): void;

    /**
     * Invoke all handlers for the given type.
     * If present, `"*"` handlers are invoked prior to type-matched handlers.
     *
     * @param {string} type The event type to invoke
     * @param {any[]} [...event_args] arguments passed to each handler
     *
     * @memberOf Emitt
     */
    emit(type: string, ...event_args: any[]): void;
  }
}
