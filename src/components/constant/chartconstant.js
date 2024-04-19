export const costTrend = {
  error: false,
  message: "Month Wise Cost",
  name: "Cost Trend ",
  type: "chart",
  data: {
    x_axis: [
      "Apr 09",
      "Apr 10",
      "Apr 11",
      "Apr 12",
      "Apr 13",
      "Apr 14",
      "Apr 15",
    ],
    series: [
      {
        name: "AWS",
        values: [
          45260.24308, 36942.50552, 36770.86357, 48682.47742, 43185.87255,
          41574.0991, 46240.34919,
        ],
      },
    ],
  },
};
export const costTrenByGroup = {
  error: false,
  message: "Month Wise Cost For Group",
  name: "Cost Trend By Group",
  type: "chart",
  data: {
    x_axis: [
      "Apr 09",
      "Apr 10",
      "Apr 11",
      "Apr 12",
      "Apr 13",
      "Apr 14",
      "Apr 15",
    ],
    series: [
      {
        name: "DT-CP",
        values: [
          5505.04382, 4362.36603, 4400.70804, 5642.84419, 5037.86234,
          4964.92002, 5444.08019,
        ],
      },
      {
        name: "DP-CiM-BotX",
        values: [
          5462.09042, 4376.11414, 4334.0048, 5769.35688, 5102.90044, 4869.50032,
          5347.62865,
        ],
      },
      {
        name: "DP-CiM-QA",
        values: [
          5381.69721, 4409.90197, 4464.40715, 5720.37643, 5090.48921,
          4882.30271, 5373.25935,
        ],
      },
      {
        name: "DP-CiM-DI",
        values: [
          5369.91552, 4410.05071, 4356.15002, 5813.06594, 5096.55121, 5010.788,
          5623.94098,
        ],
      },
      {
        name: "DP-CiM-PLT",
        values: [
          5366.79513, 4244.53335, 4308.14982, 5784.48371, 5093.05113,
          4874.09108, 5578.30316,
        ],
      },
      {
        name: "DP-CiM-VTX",
        values: [
          5340.7657, 4518.75075, 4347.55978, 5747.77626, 5033.74896, 4959.74736,
          5477.32303,
        ],
      },
      {
        name: "DP-CiM-XPLR",
        values: [
          5337.80226, 4313.9979, 4396.98187, 5775.96839, 5077.18292, 4921.63155,
          5273.82608,
        ],
      },
      {
        name: "EDX-Internal-IT",
        values: [
          5300.72044, 4439.87585, 4433.49675, 5667.46358, 5218.84007,
          4904.41715, 5519.2872,
        ],
      },
      {
        name: "DP-CiM-OPTIX",
        values: [
          5191.62063, 4393.37407, 4340.31637, 5712.89059, 5121.666, 4920.77862,
          5443.97355,
        ],
      },
    ],
  },
};
export const costByCostCenter = {
  error: false,
  message: "Cost Center Widget",
  name: "Cost Center Widget",
  type: "chart",
  data: {
    x_axis: [
      "untagged",
      "370.5360.4690",
      "310.5360.8570",
      "340.5360.4570",
      "240.5360.4570",
      "300.5360.4570",
      "360.5360.4890",
      "290.5360.4370",
      "468.0943.7778",
      "280.5360.4570",
    ],
    series: [
      {
        name: "Cost Center",
        values: [
          63608.89231, 28791.55929, 28447.26279, 28319.54103, 28273.67693,
          28259.01538, 28180.65415, 28136.06203, 28085.46848, 27901.37533,
        ],
      },
    ],
  },
};
export const costbyProducts = {
  error: false,
  message: "Top 10 Cost By Products",
  name: "Cost By Products",
  type: "kpi",
  data: {
    x_axis: [
      "Amazon Relational Database Service",
      "Amazon Elastic Compute Cloud",
      "AWS Backup",
      "Amazon EC2 Container Registry (ECR)",
      "Elastic Load Balancing",
      "Amazon Simple Storage Service",
      "Amazon DynamoDB",
      "AWS CloudTrail",
      "Amazon Elastic Container Service",
      "Amazon Simple Notification Service",
      "AWS Key Management Service",
      "AWS Lambda",
      "Amazon Redshift",
      "AWS Secrets Manager",
      "Amazon Elastic Container Service for Kubernetes",
      "AmazonCloudWatch",
      "Amazon Virtual Private Cloud",
      "AWS CloudShell",
      "Amazon Connect",
    ],
    series: [
      {
        name: "Service",
        values: [
          50415.04834, 45341.02708, 43764.90323, 32687.34494, 26840.92963,
          19319.30149, 15508.89565, 15499.81967, 15062.6975, 11684.16161,
          9918.00788, 7278.4392, 6412.89417, 5710.94046, 4803.77466, 2410.16379,
          2175.78605, 2135.92139, 1033.45097,
        ],
      },
    ],
  },
};
export const Top10CostbyGroup = {
  error: false,
  message: "Top 10 cost widget",
  name: "Top 10 widget",
  type: "chart",
  data: {
    x_axis: [
      "untagged",
      "AIG",
      "ITSS",
      "LSG",
      "PSG",
      "CCG",
      "SDG",
      "Corporate",
      "LPG",
      "CRG",
      "others",
    ],
    series: [
      {
        name: "cost",
        values: [
          182483.26, 149443.88, 147948.56, 77269.2, 46940.4, 32842.2, 22971.5,
          17371.64, 5847.07, 4905.83, 5699.16,
        ],
      },
    ],
  },
};
export const TopcontributorsbyGroup = {
  error: false,
  message: "Cost Trend Widget",
  name: "Cost Trend Widget",
  type: "chart",
  data: {
    x_axis: [
      "Apr 12",
      "Apr 13",
      "Apr 14",
      "Apr 15",
      "Apr 16",
      "Apr 17",
      "Apr 18",
    ],
    series: [
      {
        name: "Group",
        values: [
          119827.62, 115205.46, 113547.46, 118131.52, 118417.61, 68595.52,
          39997.51,
        ],
      },
    ],
  },
};
export const CostOptimizationWidget = {
  error: false,
  message: "Recommendation Detail View Opportunities Widget",
  name: "Recommendation Detail View Opportunities Widget",
  type: "chart",
  data: {
    x_axis: ["Active", "Ignored", "Resolved"],
    series: [
      {
        name: "Count",
        values: [39959, 0, 27217],
      },
    ],
  },
};
