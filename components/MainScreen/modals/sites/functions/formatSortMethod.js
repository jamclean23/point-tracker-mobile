// Formats sort method to be user facing

export default function formatSortMethod (sortMethod) {
    switch (sortMethod) {
        case 'op':
            return 'Operation';
        case 'client':
            return 'Client';
        default:
            return sortMethod;
    }
}