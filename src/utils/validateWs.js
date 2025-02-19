export const validateWorkspace = (workspaceName, savedWorkspaces) => {
    if (!Array.isArray(savedWorkspaces)) {
        savedWorkspaces = []
    }

    if (workspaceName.length < 4 || workspaceName.length > 20) {
        return 'Workspace name must be at least 4 and max 20 characters.';
    }

    if (workspaceName.trim() === '') {
        return 'Names cannot be empty or contain only spaces.';
    }

    const workspaceExists = savedWorkspaces.some(workspace => workspace.name === workspaceName);
    if (workspaceExists) {
        return 'Workspace name already exists.';
    }

    return null; 
}