<template>
	<div>
		<link rel="stylesheet" href="https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css">

		<div class="tools-panel">
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
						'mdi-shape-rectangle-plus': true,
						'active': active_tool === 'rect',
					}"
					@click="useTool('rect')"
			/>
			<a
					:class="{
						'mdi': true,
						'mdi-hand-right': true,
						'active': active_tool === 'hand',
					}"
					@click="useTool('hand')"
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
					<div class="note-author" v-text="pin.author + ':'"></div>
					<div class="note-text" v-text="pin.note"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
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

		onClick(x, y) {
		}

		onMouseInside(x, y) {
			return false;
		}

		onMouseOutside(x, y) {
			return false;
		}

		makeActive() {
			return false;
		}
		makeInactive() {
			return false;
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
			// console.log("CTX", context, this.x, this.y, this.radius, this.color);

			context.beginPath();
			context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
			context.fillStyle = '#ffffff';
			context.fill();
			context.lineWidth = 5;
			context.strokeStyle = this.color;
			context.stroke();
		}

		isInside(x, y) {
			const dx = x - this.x, dy = y - this.y;
			// return (this.is_mouse_inside = dx * dx + dy * dy <= this.radius * this.radius);
			return dx * dx + dy * dy <= this.radius * this.radius;
		}

		onClick(x, y) {
			this.click_callback(this, x, y);
		}

		onMouseInside(x, y) {
			const was_inside = this.is_mouse_inside;
			this.is_mouse_inside = true;
			// console.log("MIN", was_inside);

			if (!was_inside) {
				this.color = '#0000ff';
				return true;
			}

			return false;
		}

		onMouseOutside(x, y) {
			const was_inside = this.is_mouse_inside;
			this.is_mouse_inside = false;
			// console.log("MOUT", was_inside);

			if (was_inside) {
				this.color = this.base_color;
				return true;
			}

			return false;
		}

		makeActive() {
			if (!this.is_mouse_inside) {
				this.is_mouse_inside = true;
				this.color = '#0000ff';
				return true;
			}

			return false;
		}

		makeInactive() {
			this.is_mouse_inside = false;
			this.color = this.base_color;
		}
	}

	export default {
		name: "ReviewablePicture",
		props: {
			src: String,
			imageWidth: {type: Number, default: 0, required: true},
			imageHeight: {type: Number, default: 0, required: true},
		},

		data() {
			return {
				context: null,
				picture: null,

				active_tool: 'pin',
				active_pin: null,
				pins: [
					new PinPoint(280, 70, 10, '#00ba00', 'Root', 'WTF Note', this.pinClicked),
					new PinPoint(450, 150, 10, '#00ba00', 'Root', 'WTF Note #2', this.pinClicked),
				],
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

				console.log("IMG", this.picture.width, this.picture.height);
				this.render();
			},

			async render() {
				// this.context.drawImage(this.picture, 0, 0, this.imageWidth, this.imageHeight);
				const w = this.imageWidth * 0.8, ar = this.picture.height / this.picture.width, h = w * ar;
				// this.context.drawImage(this.picture, 0, 0, this.imageWidth * 0.8, this.imageHeight * 0.5);
				this.context.drawImage(this.picture, 0, 0, w, h);

				for (let pin of this.pins) {
					pin.render(this.context);
				}
			},

			onClick(evt) {
				console.log(evt);

				let clicked_poi = false;
				for (let pin of this.pins) {
					if (pin.isInside(evt.offsetX, evt.offsetY)) {
						pin.onClick(evt.offsetX, evt.offsetY);
						clicked_poi = true;
					}
				}

				if (clicked_poi) {
					this.render();
				} else {
					switch (this.active_tool) {
						case "pin":
							this.pins.push(
								new PinPoint(evt.offsetX, evt.offsetY, 10, '#00ba00', 'Myself', 'Some very important note', this.pinClicked),
							);
					}
				}
			},
			onMouseMove(evt) {
				this.activatePins(evt.offsetX, evt.offsetY)
			},

			activatePins(x, y) {
				// console.log(evt);

				// this.active_pin = null;
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
				console.log("CLICKED", this);
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
			}
		},

		mounted() {
			this.initCanvas(this.src);
		},
		computed: {},
		watch: {
			picture() {
				console.log("Force Render");
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
		/*background-color: #eeeeee;*/
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
					font-size: 12px;
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
</style>