
const fn = function(){}

Object.freeze(fn)

function createPath(init) {
    let path = init;
    return Object.freeze({
      addSegment(segment) { path += (`${path ? '.' : ''}${segment}`); },
      getPath() { return path; },
    });
  }
  

function createProxy(path) {
    return new Proxy(fn, {
      get(target, prop) {
        path && path.addSegment(prop);
        return createProxy(path || createPath(prop))
      },
      apply(target, thisArg, args) {
        const methodPath = path.getPath();
        console.log(methodPath);
        return methodPath
      },
    });
  }

m = createProxy()

m.g.h.j() // g.h.j

m.g.h4['jh']() // g.h4.jh

m.jkj.fgfd.rt.dsd() // jkj.fgfd.rt.dsd
