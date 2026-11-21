import React from 'react';
import { BlogPost } from './types';

const paragraph = (text: string) => React.createElement('p', null, text);
const heading = (text: string) => React.createElement('h2', null, text);
const code = (text: string) => React.createElement('pre', null, React.createElement('code', null, text));
const list = (items: string[]) => React.createElement('ul', null, ...items.map((item,i)=>React.createElement('li',{key:i},item)));

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'roc-auc-ranking-not-threshold',
    title: 'ROC-AUC is a ranking metric, not a decision threshold',
    date: 'Draft · 2026',
    category: 'Machine Learning',
    image: '',
    excerpt: 'A first-principles explanation of score thresholds, TPR, FPR, pairwise ranking, and what ROC-AUC can—and cannot—tell us about a fraud detector.',
    content: React.createElement(React.Fragment, null,
      paragraph('A binary classifier often produces a score rather than a final decision. For a transaction x, the model may return s(x) = P(Y = 1 | X = x). A threshold τ converts that score into a decision: predict fraud when s(x) ≥ τ. The threshold is a policy choice; the score is the model output.'),
      heading('The confusion matrix changes with the threshold'),
      paragraph('True positives (TP) are fraud cases correctly flagged. False positives (FP) are legitimate transactions incorrectly flagged. False negatives (FN) are missed fraud, and true negatives (TN) are legitimate transactions correctly cleared.'),
      code('TPR = TP / (TP + FN)\nFPR = FP / (FP + TN)\nPrecision = TP / (TP + FP)'),
      paragraph('Lowering the threshold usually increases both the number of flagged transactions and the true-positive rate. It can also increase the false-positive rate. ROC makes this trade-off visible across thresholds by plotting TPR against FPR.'),
      heading('AUC has a pairwise interpretation'),
      paragraph('For a randomly selected positive example and a randomly selected negative example, ROC-AUC is the probability that the positive example receives a higher score, with ties receiving half credit. In a finite dataset:'),
      code('AUC = (wins + 0.5 × ties) / (P × N)'),
      paragraph('This interpretation explains why ROC-AUC evaluates ranking quality rather than one operating threshold. AUC does not tell a bank how many customers will be blocked at a chosen threshold, nor does it encode the relative costs of false declines and missed fraud.'),
      heading('What I would report in an experiment'),
      list(['The validation protocol and whether it matches the test setting.','ROC-AUC with fold-level scores, not only one rounded number.','A threshold-specific confusion matrix chosen using a stated business objective.','Precision-recall metrics and calibration when class imbalance or probability quality matters.','The uncertainty, limitations, and any possible data leakage.']),
      paragraph('For imbalanced fraud detection, ROC-AUC is useful for ranking comparisons, but it should not be the only lens. Operational decisions require costs, capacity constraints, customer impact, and a threshold selected without peeking at the final test labels.')
    )
  },
  {
    id: 'leakage-safe-validation',
    title: 'Validation is part of the experiment, not just a score',
    date: 'Draft · 2026',
    category: 'Research Methods',
    image: '',
    excerpt: 'Why a high validation score can be misleading, how preprocessing leaks information, and how to build a fair model comparison.',
    content: React.createElement(React.Fragment, null,
      paragraph('A validation score is evidence about how a modeling procedure may perform on unseen data under a particular sampling assumption. It is not an intrinsic property of a model. Change the split, preprocessing, target definition, or time horizon and the meaning of the score can change.'),
      heading('Where leakage enters'),
      paragraph('A common mistake is to fit an imputer, scaler, feature selector, or encoder on the full dataset before splitting. The validation fold then influences the representation used to train the model. Even when labels are not directly exposed, information from the validation distribution has crossed the boundary.'),
      code('Pipeline([\n  ("imputer", SimpleImputer(strategy="median")),\n  ("scaler", StandardScaler()),\n  ("model", LogisticRegression())\n])'),
      paragraph('A pipeline lets cross-validation fit each transformation only on the training portion of each fold. Resampling, target encoding, feature selection, and hyperparameter tuning also need fold-aware handling.'),
      heading('Choose the split from the data-generating process'),
      list(['Use stratified folds for independent observations when preserving class proportions is important.','Use group-aware splitting when multiple rows belong to the same person, account, device, or entity.','Use time-aware splitting when future prediction is the real deployment task.','Audit identifiers and row order; an ID may encode time, grouping, or accidental target information.']),
      heading('Make comparisons fair'),
      paragraph('Candidate models should use the same folds, target definition, feature availability, and scoring metric. Report every fold score and summarize mean and standard deviation. Keep a final holdout or competition test set untouched until the modeling decisions are complete.'),
      paragraph('The goal is not to find the split that gives the largest score. The goal is to construct an evaluation that answers the research question honestly.')
    )
  },
  {
    id: '3d-unet-sliding-window',
    title: 'Why 3D medical image segmentation needs patch-based inference',
    date: 'Draft · 2026',
    category: 'Computer Vision',
    image: '',
    excerpt: 'Notes on volumetric tensors, memory limits, sliding windows, overlap, and the difference between patch inference and full-volume evaluation.',
    content: React.createElement(React.Fragment, null,
      paragraph('A 3D medical image is a volume, not a stack of unrelated 2D pictures. A typical tensor may contain batch, modality, depth, height, and width dimensions. A 3D convolution uses local neighborhoods across all three spatial axes, allowing the model to learn volumetric context.'),
      heading('The memory problem'),
      paragraph('Activation memory grows with batch size, number of feature channels, and spatial volume. During inference, a full-resolution volume can exceed available accelerator memory even when the model itself fits.'),
      heading('Sliding-window inference'),
      paragraph('Patch-based inference divides a volume into smaller windows. The model predicts each patch, and predictions are placed back into the corresponding region of the full output volume. Overlapping windows reduce boundary artifacts; predictions in overlapping regions can be blended or averaged.'),
      code('for window in sliding_windows(volume, patch_size, stride):\n    patch = extract(volume, window)\n    logits = model(patch)\n    accumulate(output, logits, window)\n    accumulate(weight_map, ones_like(logits), window)\n\noutput = output / clamp_min(weight_map, 1)'),
      heading('What must be checked'),
      list(['Tensor shapes and axis order: D, H, W must be consistent across images and masks.','Patch size and stride: ensure every voxel is covered, including boundaries.','Overlap aggregation: avoid dividing by zero and document blending behavior.','Post-processing and label mapping: use the competition or dataset definition.','Evaluation: reconstruct full volumes before computing patient-level or volume-level metrics when that is the intended protocol.']),
      paragraph('Patch inference is a computational strategy, not a change to the evaluation unit. A reproducible report should state the patch dimensions, stride, overlap, aggregation method, and whether metrics are computed per patch or on reconstructed volumes.')
    )
  }
];
