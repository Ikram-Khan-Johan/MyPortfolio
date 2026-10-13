export const destinations = Object.freeze({
  riverside: {name:'Riverside', point:[490,300], direct:[[110,350],[171,350],[300,300],[490,300]], via:[[110,350],[166,350],[166,205],[230,150],[365,150],[365,240],[300,300],[490,300]]},
  oldtown: {name:'Old Town', point:[230,150], direct:[[110,350],[166,350],[166,205],[230,150]], via:[[110,350],[166,350],[166,205],[230,150]]},
  techquarter: {name:'Tech Quarter', point:[567,90], direct:[[110,350],[171,350],[300,300],[365,240],[365,150],[480,150],[567,90]], via:[[110,350],[166,350],[166,205],[230,150],[480,150],[567,90]]}
});

// Deterministic illustrative paths, intentionally independent of network access.
export function buildRoute(destination='riverside', addStop=false, offline=false) {
  const place=destinations[destination];
  if(!place) throw new RangeError('Unknown destination');
  const points=(addStop?place.via:place.direct).map(point=>[...point]);
  return {name:place.name, points, path:points.map((point,index)=>`${index?'L':'M'}${point.join(' ')}`).join(' '), waypoints:addStop?3:2, mode:offline?'Offline':'Online', local:offline};
}

export function pointAlongRoute(points, progress) {
  if(!points.length) throw new RangeError('A route requires points');
  if(points.length===1) return [...points[0]];
  if(progress<=0) return [...points[0]];
  if(progress>=1) return [...points.at(-1)];
  const segments=points.slice(1).map((point,index)=>Math.hypot(point[0]-points[index][0],point[1]-points[index][1]));
  const total=segments.reduce((sum,length)=>sum+length,0);
  if(total===0) return [...points[0]];
  let remaining=Math.max(0,Math.min(1,progress))*total;
  for(let i=0;i<segments.length;i++){
    if(remaining<=segments[i] || i===segments.length-1){const t=segments[i]?remaining/segments[i]:0;return [points[i][0]+(points[i+1][0]-points[i][0])*t,points[i][1]+(points[i+1][1]-points[i][1])*t];}
    remaining-=segments[i];
  }
}
