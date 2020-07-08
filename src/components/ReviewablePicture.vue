<template>
	<div
			:class="{
				'wrapper': true,
				'dialog-mode': show_add_note,
			}"
	>
		<link rel="stylesheet" href="https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css">

		<div class="tool">
			<div class="tools-panel">
				<a
						:class="{
						'mdi': true,
						'mdi-arrow-top-left': true,
						'active': active_tool === 'select',
					}"
						@click="useTool('select')"
				/>
				<a
						:class="{
						'mdi': true,
						'mdi-pin-outline': true,
						'active': active_tool === 'pin',
					}"
						@click="useTool('pin')"
				/>
				<a
						:class="{
						'mdi': true,
						'mdi-selection-drag': true,
						'active': active_tool === 'rect',
					}"
						@click="useTool('rect')"
				/>
				<a
						:class="{
						'mdi': true,
						'mdi-shape-polygon-plus': true,
						'active': active_tool === 'poly',
					}"
						@click="useTool('poly')"
				/>
			</div>

			<div
					class="viewport"
					:style="{
					width: imageWidth + 'px',
					// height: imageHeight + 'px',
				}"
			>
				<canvas
						ref="canvas"
						:width="imageWidth * 0.8"
						:height="Math.round(imageWidth * 0.8 * (picture ? picture.height / picture.width : 1))"
						@click="onClick"
						@mousemove="onMouseMove"
				/>
				<div class="notes">
					<div
							v-for="pin in pins"
							:class="{
							'note': true,
							'active': active_pin != null && active_pin === pin,
						}"
							@mousemove="noteMouseMove(pin)"
					>
						<div class="note-author">
							<span v-text="pin.author + ':'"></span>
							<a @click="removeNote(pin)" class="mdi mdi-delete"></a>
						</div>
						<div class="note-text" v-text="pin.note"></div>
					</div>
				</div>
			</div>
		</div>

		<div class="add-pin-wrapper">
			<div class="add-pin-box">
				<div class="title">
					Add Note
				</div>
				<div>
					<textarea
							placeholder="Note Text"
							v-model="add_note_text"
					/>
				</div>
				<div>
					<compact-picker v-model="selected_color"></compact-picker>
				</div>
				<div class="actions">
					<button @click="createNote()">Create</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {Compact} from 'vue-color';

	const pin_color = '#fa28ff';
	const hover_color = '#ffe500';

	function renderRect(context, p1, p2, line_width, color) {
		context.beginPath();
		context.moveTo(p1.x, p1.y);
		context.lineTo(p1.x, p2.y);
		context.lineTo(p2.x, p2.y);
		context.lineTo(p2.x, p1.y);
		context.lineTo(p1.x, p1.y);

		context.lineWidth = line_width;
		context.strokeStyle = color;
		context.stroke();
	}

	function renderPoly(context, points, close_figure, start_width, line_width, color) {
		context.beginPath();

		if (points.length > 1) {
			points.forEach((point, idx) => {
				if (idx === 0) {
					context.moveTo(point.x, point.y);
				} else {
					context.lineTo(point.x, point.y);
				}
			});
			if (close_figure) {
				context.lineTo(points[0].x, points[0].y);
			}
		}

		context.lineWidth = line_width;
		context.strokeStyle = color;
		context.stroke();

		if (!close_figure && points.length > 0) {
			renderCircle(context, points[0], start_width, line_width, '#ffffff', color);
		}
	}

	function renderCircle(context, center, radius, line_width, color, stroke_color) {
		context.beginPath();
		context.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
		context.fillStyle = color;
		context.fill();
		context.lineWidth = line_width;
		context.strokeStyle = stroke_color;
		context.stroke();
	}

	function renderCross(context, center, size, line_width, color) {
		context.beginPath();
		context.moveTo(center.x - size, center.y);
		context.lineTo(center.x + size, center.y);
		context.moveTo(center.x, center.y - size);
		context.lineTo(center.x, center.y + size);

		context.lineWidth = line_width;
		context.strokeStyle = color;
		context.stroke();
	}

	class Pin {
		constructor(color, author, note, click_callback) {
			this.color = color;
			this.author = author;
			this.note = note;
			this.click_callback = click_callback;

			this.base_color = null;
			this.is_mouse_inside = false;
		}

		render(context) {
		}

		isInside(x, y) {
		}

		asJSON() {
		}

		onClick(x, y) {
			this.click_callback(this, x, y);
		}

		onMouseInside(x, y) {
			const was_inside = this.is_mouse_inside;
			this.is_mouse_inside = true;

			if (!was_inside) {
				this.color = hover_color;
				return true;
			}

			return false;
		}

		onMouseOutside(x, y) {
			const was_inside = this.is_mouse_inside;
			this.is_mouse_inside = false;

			if (was_inside) {
				this.color = this.base_color;
				return true;
			}

			return false;
		}

		makeActive() {
			if (!this.is_mouse_inside) {
				this.is_mouse_inside = true;
				this.color = hover_color;
				return true;
			}

			return false;
		}

		makeInactive() {
			this.is_mouse_inside = false;
			this.color = this.base_color;
		}

	};

	class PinPoint extends Pin {
		constructor(x, y, radius, color, author, note, click_callback) {
			super(color, author, note, click_callback);

			this.base_color = color;
			this.x = x;
			this.y = y;
			this.radius = radius;
		}

		render(context) {
			super.render();

			renderCircle(context, {x: this.x, y: this.y}, this.radius, 5, '#ffffff', this.color);
		}

		isInside(x, y) {
			const dx = x - this.x, dy = y - this.y;
			return dx * dx + dy * dy <= this.radius * this.radius;
		}

		asJSON() {
			return {
				type: 'point',
				color: this.color,
				author: this.author,
				note: this.note,
				x: this.x,
				y: this.y,
				radius: this.radius,
			};
		}
	}

	class PinRect extends Pin {
		constructor(p1, p2, color, author, note, click_callback) {
			super(color, author, note, click_callback);

			this.base_color = color;
			this.p1 = p1;
			this.p2 = p2;
		}

		render(context) {
			super.render();
			renderRect(context, this.p1, this.p2, 2, this.color);
		}

		isInside(x, y) {
			return x >= Math.min(this.p1.x, this.p2.x) && y >= Math.min(this.p1.y, this.p2.y)
				&& x <= Math.max(this.p1.x, this.p2.x) && y <= Math.max(this.p1.y, this.p2.y);
		}

		asJSON() {
			return {
				type: 'rect',
				color: this.color,
				author: this.author,
				note: this.note,
				p1: this.p1,
				p2: this.p2,
			};
		}
	}

	class PinPoly extends Pin {
		constructor(points, close_radius, color, author, note, click_callback) {
			super(color, author, note, click_callback);

			this.base_color = color;
			this.points = points;
			this.close_radius = close_radius;

			// console.log("points", JSON.stringify(points));
		}

		render(context) {
			super.render();
			renderPoly(context, this.points, true, 10, 2, this.color);
		}

		isInside(x, y) {
			let result = false;

			for (let i = 0, j = this.points.length - 1; i < this.points.length; j = i++) {
				const p1 = this.points[i], p2 = this.points[j];

				if ((p1.y > y) !== (p2.y > y) && (x < (p2.x - p1.x) * (y - p1.y) / (p2.y - p1.y) + p1.x)) {
					result = !result;
				}
			}
			return result;
		}

		asJSON() {
			return {
				type: 'poly',
				color: this.color,
				author: this.author,
				note: this.note,
				points: this.points,
			};
		}
	}

	export default {
		name: "ReviewablePicture",

		components: {
			'compact-picker': Compact,
		},

		props: {
			src: String,
			imageWidth: {type: Number, default: 0, required: true},
			imageHeight: {type: Number, default: 0, required: true},
			saved_pins: {type: Array, default: [], required: false},
		},

		data() {
			return {
				context: null,
				picture: null,
				selected_color: {hex: pin_color},

				active_tool: 'select',
				active_pin: null,
				rect_p1: null,
				poly_points: null,
				poly_first_point: null,

				show_add_note: false,

				pins: [
					// new PinPoint(330, 90, 10, '#000000', 'Root', "I don't like the blue sky. Let's make it purple.", this.pinClicked),
					// new PinPoint(405, 512, 10, pin_color, 'Root', 'This guy got a cool hat', this.pinClicked),
					// new PinRect({x: 520, y: 120}, {x: 660, y: 420}, '#FCC400', 'Root', 'Pretty cool skyscraper', this.rectClicked),
					// new PinPoly([
					// 		{x: 310, y: 410}, {x: 310, y: 385}, {x: 291, y: 367}, {x: 290, y: 330}, {x: 312, y: 304}, {x: 353, y: 304},
					// 		{x: 372, y: 328}, {x: 371, y: 368}, {x: 353, y: 385}, {x: 353, y: 411}],
					// 	10, '#ffffff', 'Root', "This is Vegas, babe", this.rectClicked),
				],

				ask_for_note_resolve: null,
				add_note_text: '',
			};
		},

		methods: {
			async loadPicture(src) {

				return new Promise((resolve, reject) => {
					const img = new Image();
					img.addEventListener("load", () => resolve(img));
					img.addEventListener("error", err => reject(err));
					img.src = src;
				});
			},

			async initCanvas(src) {
				const canvas = this.$refs.canvas;
				this.context = canvas.getContext('2d');
				this.picture = await this.loadPicture(src);

				console.log("Loaded picture", this.picture.width, this.picture.height);
				this.render();
			},

			render() {
				if (!this.picture) {
					return;
				}

				const w = this.imageWidth * 0.8, ar = this.picture.height / this.picture.width, h = w * ar;
				this.context.drawImage(this.picture, 0, 0, w, h);

				for (let pin of this.pins) {
					pin.render(this.context);
				}
			},

			getPins() {
				const result = [];
				for (let pin of this.pins) {
					result.push(pin.asJSON());
				}

				return result;
			},

			save() {
				this.$emit('save', this.getPins());
			},

			async onClick(evt) {
				console.log(evt);

				switch (this.active_tool) {
					case "select":
						this.rect_p1 = null;

						for (let pin of this.pins) {
							if (pin.isInside(evt.offsetX, evt.offsetY)) {
								pin.onClick(evt.offsetX, evt.offsetY);
							}
						}

						this.render();
						break;
					case "pin":
						this.rect_p1 = null;
						let text = await this.askForNote();

						this.pins.push(
							new PinPoint(evt.offsetX, evt.offsetY, 10, this.selected_color['hex'], 'Myself', text, this.pinClicked),
						);
						this.save();

						this.render();

						break;
					case 'rect':
						if (this.rect_p1 !== null) {
							let p2 = {x: evt.offsetX, y: evt.offsetY};

							let text = await this.askForNote();

							this.pins.push(
								new PinRect(this.rect_p1, p2, this.selected_color['hex'], 'Myself', text, this.rectClicked),
							);
							this.save();

							this.rect_p1 = null;
						} else {
							this.rect_p1 = {x: evt.offsetX, y: evt.offsetY};
						}

						this.render();
						break;
					case 'poly':
						let p = {x: evt.offsetX, y: evt.offsetY};

						if (this.poly_first_point === null) {
							this.poly_first_point = p;
							this.poly_points = [p];

						} else {
							const dx = this.poly_first_point.x - p.x, dy = this.poly_first_point.y - p.y;
							const close_radius = 10;

							console.log(dx, dy);

							if (dx * dx + dy * dy <= close_radius * close_radius) {
								let text = await this.askForNote();

								this.pins.push(
									new PinPoly(this.poly_points, close_radius, this.selected_color['hex'], 'Myself', text, this.polyClicked),
								);
								this.save();

								this.poly_first_point = null;
								this.poly_points = null;

							} else {
								this.poly_points.push(p);
							}
						}

						this.render();
						break;
				}
			},

			onMouseMove(evt) {
				const p = {x: evt.offsetX, y: evt.offsetY};

				if (this.active_tool === 'rect' && this.rect_p1 !== null) {
					this.render();
					renderRect(this.context, this.rect_p1, p, 1, '#ff0000');

					return;
				}

				if (this.active_tool === 'poly' && this.poly_points !== null) {
					this.render();
					// renderPoly(this.context, [...this.poly_points, p], 1, '#ff0000');
					renderPoly(this.context, [...this.poly_points, p], false, 10, 1, '#ff0000');

					return;
				}

				if (this.active_tool === 'pin') {
					this.render();
					renderCircle(this.context, p, 5, 3, '#ffffff', '#ff0000');

				} else if (this.active_tool === 'rect') {
					this.render();
					renderCross(this.context, p, 10, 1, '#ff0000');

				} else if (this.active_tool === 'poly') {
					this.render();
					renderCross(this.context, p, 10, 1, '#ff0000');
				}

				this.activatePins(evt.offsetX, evt.offsetY);
			},

			activatePins(x, y) {
				let invalidate = false;

				for (let pin of this.pins) {
					if (pin.isInside(x, y)) {
						const is_inside = pin.onMouseInside(x, y);
						invalidate = is_inside || invalidate;
						if (is_inside) {
							this.active_pin = pin;
						}
					} else {
						const is_outside = pin.onMouseOutside(x, y);
						invalidate = is_outside || invalidate;
						if (is_outside) {
							this.active_pin = null;
						}
					}
				}

				if (invalidate) {
					this.render();
				}
			},
			pinClicked(element, x, y) {
				console.log("Pin Point Clicked", this);
			},
			rectClicked(element, x, y) {
				console.log("Rect Clicked", this);
			},
			polyClicked(element, x, y) {
				console.log("Poly Clicked", this);
			},
			useTool(tool) {
				this.active_tool = tool;
			},
			noteMouseMove(pin) {
				let invalidate = false;
				for (let p of this.pins) {
					if (p === pin) {
						this.active_pin = pin;
						invalidate = pin.makeActive() || invalidate;
					} else {
						p.makeInactive();
					}
				}

				if (invalidate) {
					this.render();
				}
			},
			removeNote(pin) {
				this.pins = this.pins.filter(x => x !== pin);
				this.save();
				this.render();
			},

			async askForNote() {
				this.show_add_note = true;
				this.add_note_text = '';

				return new Promise((resolve, reject) => {
					this.ask_for_note_resolve = resolve;
				});
			},
			async createNote() {
				console.log("Save note");

				this.ask_for_note_resolve(this.add_note_text);
				this.show_add_note = false;
			},

			loadPins(saved_pins) {
				this.pins = [];

				for (let sp of saved_pins) {
					let the_pin = null;

					switch (sp.type) {
						case 'point':
							the_pin = new PinPoint(sp.x, sp.y, sp.radius, sp.color, sp.author, sp.note, this.pinClicked);
							break;
						case 'rect':
							the_pin = new PinRect(sp.p1, sp.p2, sp.color, sp.author, sp.note, this.pinClicked);
							break;
						case 'poly':
							the_pin = new PinPoly(sp.points, sp.radius, sp.color, sp.author, sp.note, this.pinClicked);
							break;
					}

					if (the_pin) {
						this.pins.push(the_pin);
					}
				}
			},
		},

		mounted() {
			this.initCanvas(this.src);
			this.loadPins(this.saved_pins);
		},
		computed: {},
		watch: {
			picture() {
				console.log("Invalidate canvas");

				window.setTimeout(() => {
					this.render();
				});
			},
		},
	};
</script>

<style scoped lang="less">
	.tools-panel {
		margin-bottom: 10px;
		display: flex;
		justify-content: center;
		padding: 5px 0;

		a {
			@size: 40px;
			display: block;
			font-size: 36px;
			cursor: pointer;
			border: 3px solid #333;
			width: @size;
			height: @size;
			line-height: @size;
			color: #333;
			margin-left: 10px;
			background-color: #fff;

			&:first-child {
				margin-left: 0;
			}

			&:hover {
				color: #197c00;
				border-color: #197c00;
			}

			&.active {
				color: #197c00;
				border-color: #197c00;
			}
		}
	}

	.viewport {
		display: flex;
		margin: 0 auto;
		background-color: #636363;
		padding: 10px;

		canvas {
			width: 80%;
			height: 100%;
		}

		.notes {
			width: 20%;
			box-sizing: border-box;
			padding-left: 10px;

			.note {
				background-color: #fff;
				box-sizing: border-box;
				width: 100%;
				margin-bottom: 10px;
				padding: 10px;
				text-align: left;

				.note-author {
					font-style: italic;
					color: #aaa;
					font-size: 14px;

					a {
						display: inline-block;
						margin-left: 10px;
						color: #333;
						font-style: normal;
						cursor: pointer;
						font-size: 16px;
						float: right;

						&:hover {
							color: #ffff00;
						}
					}
				}

				.note-text {
					margin-top: 5px;
					color: #000;
				}

				&.active {
					background-color: #4772d2;

					.note-author {
						color: #e4e4e4;
					}

					.note-text {
						color: #fff;
					}
				}
			}
		}
	}

	.add-pin-wrapper {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.3);

		.add-pin-box {
			@width: 500px;
			position: absolute;
			top: 20%;
			left: 50%;
			width: @width;
			margin-left: -@width / 2;
			background-color: #333;
			border-radius: 10px;
			/*padding: 20px;*/

			div {
				width: 100%;
				padding: 0 20px;
				box-sizing: border-box;

				textarea {
					width: 100%;
					box-sizing: border-box;
					height: 60px;
					background-color: #fff;
					padding: 5px;
				}

				&.title {
					color: #fff;
					text-align: left;
					padding: 15px 20px;
					font-size: 14px;
					letter-spacing: 1px;
					margin-bottom: 5px;
				}

				&.actions {
					padding: 10px 0 20px;

					button {
						width: 140px;
						height: 30px;
						color: #fff;
						border: 2px solid #9f9f9f;
						border-radius: 15px;
						background-color: #6d706d;
						font-size: 14px;
					}
				}

			}

		}
	}

	.wrapper {
		&.dialog-mode {
			.tool {
				@blur: 5px;
				filter: blur(@blur);
				-webkit-filter: blur(@blur);
			}

			.add-pin-wrapper {
				display: block;
			}
		}
	}

	/deep/ .vc-compact {
		width: 440px !important;
		background-color: transparent;
		box-shadow: none;
		margin: 15px auto 0;
		padding: 10px;
		height: 54px;
	}

	/deep/ .vc-compact-color-item {
		border: 1px solid #696969;
		border: 1px solid #696969;
	}

	/deep/ .vc-compact-dot {
		@offset: 3px;
		top: @offset !important;
		bottom: @offset !important;
		left: @offset !important;
		right: @offset !important;
	}
</style>