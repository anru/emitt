import mitt from '../src';


describe('emitt#', () => {
	let events, inst;

	it('should default export be a function', () => {
		expect(typeof mitt).toBe('function');
	});

	beforeEach( () => {
		events = Object.create(null);
		inst = mitt(events);
	});

	describe('on()', () => {
		it('should be a function', () => {
			expect(inst).toHaveProperty('on');
			expect(typeof inst.on).toBe('function');
		});

		it('should register handler for new type', () => {
			let foo = () => {};
			inst.on('foo', foo);

			expect(events).toHaveProperty('foo', [foo]);
		});

		it('should register handlers for any type strings', () => {
			let foo = () => {};
			inst.on('constructor', foo);

			expect(events).toHaveProperty('constructor', [foo]);
		});

		it('should append handler for existing type', () => {
			let foo = () => {};
			let bar = () => {};
			inst.on('foo', foo);
			inst.on('foo', bar);

			expect(events).toHaveProperty('foo', [foo, bar]);
		});

		it('should NOT normalize case', () => {
			let foo = () => {};
			inst.on('FOO', foo);
			inst.on('Bar', foo);
			inst.on('baz:baT!', foo);

			// workaround for jest bug
			const pevents = Object.assign({}, events);

			expect(events).toHaveProperty('FOO', [foo]);
			expect(pevents).not.toHaveProperty('foo');
			expect(events).toHaveProperty('Bar', [foo]);
			expect(pevents).not.toHaveProperty('bar');
			expect(events).toHaveProperty('baz:baT!', [foo]);
		});
	});

	describe('off()', () => {
		it('should be a function', () => {
			expect(inst).toHaveProperty('off');
			expect(typeof inst.off).toBe('function');
		});

		it('should remove handler for type', () => {
			let foo = () => {};
			inst.on('foo', foo);
			inst.off('foo', foo);

			expect(events).toHaveProperty('foo', []);
		});

		it('should NOT normalize case', () => {
			let foo = () => {};
			inst.on('FOO', foo);
			inst.on('Bar', foo);
			inst.on('baz:bat!', foo);

			inst.off('FOO', foo);
			inst.off('Bar', foo);
			inst.off('baz:baT!', foo);

			// workaround for jest bug
			const pevents = Object.assign({}, events);

			expect(events).toHaveProperty('FOO', []);
			expect(pevents).not.toHaveProperty('foo');
			expect(events).toHaveProperty('Bar', []);
			expect(pevents).not.toHaveProperty('bar');
			expect(events).toHaveProperty('baz:bat!', [foo]);
		});
	});

	describe('emit()', () => {
		it('should be a function', () => {
			expect(inst).toHaveProperty('emit');
			expect(typeof inst.emit).toBe('function');
		});

		it('should invoke handler for type', () => {
			const event = { a: 'b' };

			inst.on('foo', (one, two) => {
				expect(one).toEqual(event);
				expect(two).toBe(void 0);
			});

			inst.emit('foo', event);
		});

		it('should pass all args to listenenrs', () => {
			const event = { a: 'b' };
			const event2 = Symbol('two');

			inst.on('foo', (one, two) => {
				expect(one).toEqual(event);
				expect(two).toBe(event2);
			});

			inst.emit('foo', event, event2);
		});

		it('should NOT ignore case', () => {
			let onFoo = jest.fn(),
				onFOO = jest.fn();
			events.Foo = [onFoo];
			events.FOO = [onFOO];

			inst.emit('Foo', 'Foo arg');
			inst.emit('FOO', 'FOO arg');

			expect(onFoo).toHaveBeenCalledTimes(1);
			expect(onFoo).toHaveBeenCalledWith('Foo arg');
			expect(onFOO).toHaveBeenCalledTimes(1);
			expect(onFOO).toHaveBeenCalledWith('FOO arg');
		});

		it('should invoke * handlers', () => {
			let star = jest.fn(),
				ea = { a: 'a' },
				eb = { b: 'b' };

			events['*'] = [star];

			inst.emit('foo', ea);
			expect(star).toHaveBeenCalledTimes(1);
			expect(star).toHaveBeenCalledWith('foo', ea);
			star = jest.fn();
			events['*'] = [star];

			inst.emit('bar', eb);
			expect(star).toHaveBeenCalledTimes(1);
			expect(star).toHaveBeenCalledWith('bar', eb);
		});
	});
});
