import React from 'react';

export default class Masonry extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			columns: 1,
			hasRendered: false
		};
		this.onResize = this.onResize.bind(this);
		this.mapChildrenForRenderedComponents = this.mapChildrenForRenderedComponents.bind(this);
	}
	componentDidMount(){
		this.onResize();
		window.addEventListener('resize', this.onResize)	
	}
	componentDidUpdate(){
		if (!this.state.hasRendered){
			setTimeout(() => {
				this.setState({
					hasRendered: true
				})
			}, 1000);
		}
	}
	
	getColumns(w){
		return this.props.brakePoints.reduceRight( (p, c, i) => {
			return c < w ? p : i;
		}, this.props.brakePoints.length) + 1;
	}
	
	onResize(){
		if(!!this.refs.Masonry && !('offsetWidth' in this.refs.Masonry)){
			return;
		}
		const columns = this.getColumns(this.refs.Masonry.offsetWidth);
		if(columns !== this.state.columns){
			this.setState({columns: columns});	
		}
	}
	mapChildren(){
		if (this.state.hasRendered){
			return this.mapChildrenForRenderedComponents()
		}else{
			return this.mapChildrenForUnrenderedComponents()
		}
	}
	mapChildrenForUnrenderedComponents(){
		let col = [];
		const numC = this.state.columns;
		for(let i = 0; i < numC; i++){
			col.push([]);
		}
		return this.props.children.reduce((p,c,i) => {
			p[i%numC].push(c);
			return p;
		}, col);
	}
	
	mapChildrenForRenderedComponents(){
		let colSize = {};
		const col = []
		const numC = this.state.columns;
		for(let i = 0; i < numC; i++){
			colSize[i] = 0;
			col.push([])
		}
		const getMaxAndMinOfColSize = (obj) => {
			let max = 0;
			let min = 0;
			for (let i = 0; i < numC; i++) {
				if(obj[i] > obj[max]){
					max = i;
				}
				if(obj[i] < obj[min]){
					min = i;
				}
			}
			return { max, min };
		}
		return this.props.children.reduce((p,c,i) => {
			const { max, min } = getMaxAndMinOfColSize(colSize);
			if (!(("Masonry"+i) in this.refs)){
				this.setState({
					hasRendered: false
				})
				return p;
			}
			const curHeight = this.refs["Masonry"+i].clientHeight;
			if (!!curHeight && (colSize[max] - colSize[min]) > curHeight){
				p[min].push(c);
				colSize[min] += curHeight;
			} else {
				p[i%numC].push(c);
				colSize[i%numC] += curHeight;
			}
			return p;
		}, col);
	}
	
	render(){
		let cnt = -1;
		return (
			<div style={MasonryStyle} ref="Masonry">
				{this.mapChildren().map((col, ci) => {
					return (
						<div style={ColumnStyle} key={ci} >
							{col.map((child, i) => {
								cnt += 1
								return <div key={i} ref={"Masonry"+cnt} >{child}</div>
							})}
						</div>
					)
				})}
			</div>
		)
	}
}
const MasonryStyle = {
	display: "flex",
	flexDirection: "row",
	justifyContent: "center",
	alignContent: "stretch",
	width: "100%",
	margin: "auto",
}
const ColumnStyle = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "flex-start",
	alignContent: "stretch",
	flexGrow: "1",
}