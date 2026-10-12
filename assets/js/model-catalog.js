window.AXON_MODEL_CATALOG = [
  {
    id: 'nn', name: 'Neural Network', type: 'deep-learning', typeLabel: 'Deep Learning',
    status: 'live', statusLabel: 'Live',
    desc: 'A handwritten-digit classifier walked through input, hidden and output layers to a final prediction.',
    metrics: [{ v: '784', l: 'Input units' }, { v: '128 → 64', l: 'Hidden layers' }, { v: '10', l: 'Output classes' }],
    tags: ['Unity WebGL', 'TensorFlow/Keras', 'C#'],
    link: '/nn-model/index.html',
    overview: 'A feedforward neural network that classifies handwritten digits, rendered as a walkable 3D graph with 784 inputs, hidden layers of 128 and 64 neurons, and 10 output classes.',
    useCase: 'Teaching forward propagation, activation functions and softmax classification through direct interaction rather than static diagrams.',
    dataset: 'The visualizer accepts a 28×28 grayscale drawing. The project does not publish a verified training-set size or evaluation score.',
    sample: null
  },
  {
    id: 'clustering', name: 'Clustering (K-Means)', type: 'unsupervised', typeLabel: 'Unsupervised',
    status: 'live', statusLabel: 'Live',
    desc: 'Explore how datasets, K, distance metrics and centroid initialization change unsupervised cluster assignments.',
    metrics: [{ v: '3', l: 'Distance metrics' }, { v: '7', l: 'Datasets' }, { v: '100', l: 'Max iterations' }, { v: 'K', l: 'Chosen clusters' }],
    tags: ['Unity WebGL', 'C#', 'Unsupervised'],
    link: '/kmc_model/index.html',
    overview: 'An interactive K-Means visualizer that assigns numeric points to the nearest centroid and updates each center using a rule matched to the selected distance metric.',
    useCase: 'Compare unsupervised groupings by changing K, dataset, initialization and Euclidean, Manhattan or Cosine distance. Cluster IDs are not predefined classes.',
    dataset: 'Seven datasets are available, including synthetic patterns, customer segmentation, Iris measurements and image color quantization. Ground-truth labels are available only for labeled synthetic data and Iris; customer segmentation has no reference clusters.',
    sample: null
  },
  {
    id: 'llm', name: 'LLM (Transformer)', type: 'deep-learning', typeLabel: 'Deep Learning',
    status: 'live', statusLabel: 'Live',
    desc: 'Explore how tokens, self-attention, and next-token prediction work in an interactive 3D visualization.',
    metrics: [{ v: '4', l: 'Inference Stages' }, { v: '7', l: 'Topics Covered' }],
    tags: ['Next-Word Prediction', 'Self-Attention', 'Unity WebGL'],
    link: '/llm_model/index.html',
    overview: 'A compact Transformer trained to predict the next word in short, grammar-generated sentences.',
    useCase: 'Exploring how token IDs, self-attention and next-word probabilities contribute to a prediction.',
    dataset: '512 short grammar-generated sentences split into 409 training, 51 validation and 52 test examples.',
    sample: [20, 35, 50, 64, 58, 42, 30]
  },
  {
    id: 'tree', name: 'Decision Tree', type: 'supervised', typeLabel: 'Supervised',
    status: 'live', statusLabel: 'Live',
    desc: 'Explore how a decision tree uses clinical features to classify heart disease and follow each branch to a yes-or-no prediction.',
    metrics: [{ v: '81.7%', l: 'Test Accuracy' }, { v: '77.6%', l: 'F1 Score' }, { v: '4', l: 'Tree Depth' }, { v: '8', l: 'Leaves' }],
    tags: ['scikit-learn', 'Unity', 'C#'],
    link: '/dt_model/index.html',
    overview: 'A decision tree classifier trained on the Cleveland heart disease dataset. Its 15 nodes and 8 leaves split patients using four clinical features to reach a heart-disease yes-or-no classification.',
    useCase: 'Following a prediction path through the tree makes each feature-based split and final leaf easier to inspect.',
    dataset: 'Cleveland heart disease data for 296 patients: 236 training examples and 60 test examples. Features used by the tree are chest pain type, major vessels colored, thalassemia test, and ST segment slope.',
    sample: [60, 73, 68, 82, 76, 90, 81.7]
  },
  {
    id: 'cnn', name: 'CNN', type: 'deep-learning', typeLabel: 'Deep Learning',
    status: 'planned', statusLabel: 'Planned',
    desc: 'A convolutional network shown as stacked filters sliding over an image in 3D.',
    metrics: [{ v: '97.8%', l: 'Accuracy' }, { v: '0.97', l: 'F1 Score' }, { v: '60K', l: 'Dataset' }, { v: '31ms', l: 'Inference' }],
    primary: 98, tags: ['TensorFlow', 'Unity', 'C#'],
    link: null,
    overview: 'A convolutional neural network visualized filter-by-filter — showing how convolution and pooling extract features from an image.',
    useCase: 'Understanding feature maps, kernels and pooling as a spatial process instead of a black box.',
    dataset: 'Image dataset, 60,000 labeled images across 10 classes.',
    sample: [55, 70, 85, 98, 90, 75, 60]
  },
  {
    id: 'knn', name: 'KNN', type: 'supervised', typeLabel: 'Supervised',
    status: 'planned', statusLabel: 'Planned',
    desc: 'A 3D neighborhood view showing how a new point is classified by its nearest neighbors.',
    metrics: [{ v: '88.4%', l: 'Accuracy' }, { v: '5', l: 'K Value' }, { v: '3K', l: 'Dataset' }, { v: '6ms', l: 'Inference' }],
    primary: 88, tags: ['scikit-learn', 'Unity'],
    link: null,
    overview: 'K-Nearest Neighbors classifies a point by majority vote among its closest neighbors in 3D feature space.',
    useCase: 'Showing how the choice of k and distance metric changes classification boundaries in real time.',
    dataset: 'Labeled point dataset, 3,000 samples.',
    sample: [40, 55, 70, 88, 74, 58, 42]
  },
  {
    id: 'rf', name: 'Random Forest', type: 'ensemble', typeLabel: 'Ensemble',
    status: 'planned', statusLabel: 'Planned',
    desc: 'A forest of decision trees shown side by side, voting together on a final prediction.',
    metrics: [{ v: '94.5%', l: 'Accuracy' }, { v: '0.93', l: 'F1 Score' }, { v: '100', l: 'Trees' }, { v: '15ms', l: 'Inference' }],
    primary: 94, tags: ['scikit-learn', 'Unity', 'C#'],
    link: null,
    overview: 'Random Forest trains many decision trees on random subsets of data and features, then combines their votes into one prediction.',
    useCase: 'Visualizing how ensembling many weak trees produces a stronger, more stable classifier.',
    dataset: 'Structured tabular dataset, 8,000 rows, 12 features.',
    sample: [50, 65, 80, 94, 85, 70, 55]
  }
];
