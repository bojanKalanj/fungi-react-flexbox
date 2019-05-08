export const selectPaginationPage = (page) => {
    return {
        type: "PAGINATION_SELECTED",
        payload: page
    };
};
