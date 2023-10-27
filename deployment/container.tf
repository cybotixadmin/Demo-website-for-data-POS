provider "aws" {
  region = var.region
   shared_credentials_files = ["~/.aws/credentials"]
  profile = "terraform_deployment"
}


# ECR Repository
resource "aws_ecr_repository" "cybotix_demo_app" {
  name = "cybotix_demo_app"
}

# ECS Cluster
resource "aws_ecs_cluster" "my_cluster" {
  name = "my-cluster"
 tags = {
    Name = "test-env"
  }
}

# ECS Task Definition
resource "aws_ecs_task_definition" "my_task" {
  family                   = "my-task"
  network_mode             = "bridge"
  requires_compatibilities = ["EC2"]
  cpu                      = "256"
  memory                   = "512"
  container_definitions    = jsonencode([{
    name  = "my-container"
    image = "${aws_ecr_repository.cybotix_demo_app.repository_url}:latest"
    portMappings = [{
      containerPort = 6000
      hostPort      = 8080
    }]
  }])
 tags = {
    Name = "test-env"
  }
}

# ECS Service
resource "aws_ecs_service" "my_service" {
  name            = "my-service"
  cluster         = aws_ecs_cluster.my_cluster.id
  task_definition = aws_ecs_task_definition.my_task.arn
  desired_count   = 1
  launch_type     = "EC2"
 tags = {
    Name = "test-env"
  }
}
