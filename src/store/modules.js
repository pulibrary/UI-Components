export const counterModule = {
  state: { count: 10 },

  mutations: {
    increment(state) {
      // `state` is the local module state
      state.count++
    },
  },

  getters: {
    count: state => {
      return state.count
    },
  },
}

export const resourceModule = {
  state: {
    resource: {
      id: "",
      bibId: "",
      label: "Resource not available.",
      isMultiVolume: false,
      members: [],
      viewingHint: null,
      viewingDirection: null,
      loadState: "NOT_LOADED",
    },
  },

  mutations: {
    CHANGE_RESOURCE_LOAD_STATE(state, loadState) {
      state.resource.loadState = loadState
    },
    SET_RESOURCE(state, resource) {
      state.resource.id = resource.id
      state.resource.label = resource.label
      state.resource.members = resource.members
      state.resource.viewingHint = resource.viewingHint
      state.resource.loadState = "LOADED"
    },
    UPDATE_VIEWDIR(state, viewDir) {
      state.viewingDirection = viewDir
    },
    UPDATE_VIEWHINT(state, viewHint) {
      state.resource.viewingHint = viewHint
    },
  },

  // actions: any async actions are should be handled by the host app

  getters: {
    getMemberCount: state => {
      return state.resource.members.length
    },
    isMultiVolume: state => {
      const volumes = state.resource.members.filter(member => member.__typename === "ScannedResource")
      return volumes.length > 0 ? true : false
    },
  },
}

let modules
export default (modules = { counterModule, resourceModule })
