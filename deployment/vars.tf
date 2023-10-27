variable "region" {
    description = "AWS region"
}
variable "vpc_id" {
    description = "VPC identifier, collected from execution of scripts in the /vpc/ directory"
}

variable "subnet_db_id" {
    description = "VPC subnet identifier, collected from execution of scripts in the /vpc/ directory"
}

variable "subnet_web_id" {
    description = "VPC subnet identifier, collected from execution of scripts in the /vpc/ directory"
}

variable "db_address" {
    description = "address of the database, output from data-storage terraform script"
}


variable "public_ip" {
    description = "public IP address, output from data-storage terraform script"
}

variable "key_name" {
    description = "ssh key"
}

