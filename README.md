# HORUS: Holistic Operational Reality for Unified Systems

## Overview

HORUS (Holistic Operational Reality for Unified Systems) is an innovative Mixed Reality (MR) application developed for the Meta Quest 3 headset. It aims to provide a comprehensive solution for managing teams of heterogeneous robots in various environments, with a particular focus on disaster scenarios.

### Current Version: 0.0.1

This initial release focuses on teleoperation capabilities for wheeled robots (ROSbots). Future updates will expand functionality to support heterogeneous robot teams including legged (Spot) and aerial (Airvolute and DJI Tello) robots.

## Features

- Mixed reality interface for robot control and team management
- Multi-robot task allocation and management
- Real-time sensor data visualization
- Intuitive gesture-based controls for robot interaction
- Multiple teleoperation modes:
  - Minimap (Ground Station) Mode
  - Semi-Immersive Mode
  - Full Immersion Mode
- Flexible camera visualization
- Developed for Meta Quest 3 headset

## Installation

1. Download the latest APK from the [Releases](https://github.com/RICE-unige/horus/releases) section.
2. Install the APK on your Meta Quest 3 headset using SideQuest or your preferred method for sideloading apps.

## Usage

### Prerequisites
1. Install the HORUS Bridge application on your laptop where the ROS master will be launched. Visit the [HORUS Bridge GitHub repository](https://github.com/Omotoye/horus_bridge) for installation instructions.
2. Ensure that both your laptop running HORUS Bridge and the Meta Quest 3 headset are on the same network.

### Setup
1. Launch the HORUS Bridge on your laptop following the instructions in the HORUS Bridge README.
2. For connecting and setting up all robots for the interface, follow the instructions provided in the HORUS Bridge GitHub repository.

### Using the HORUS Application
1. Put on your Meta Quest 3 headset.
2. Navigate to your installed apps and launch HORUS.
3. When the application opens, you will see a login page.
4. Enter the IP address displayed in the HORUS Bridge log on your laptop into the IP address section of the HORUS application login page.
5. After successful login, follow these steps:
   a. Draw a workspace in the mixed reality environment.
   b. A minimap (workstation) will spawn within this designated area.
   c. Use the minimap to view available robots in the team.
   d. Select individual robots to access various functions:
      - View robot status
      - Visualize sensor data
      - Allocate tasks
      - Initiate teleoperation
6. Explore different teleoperation modes:
   - Minimap Mode: Navigate robots on a 2D overhead view.
   - Semi-Immersive Mode: View robot camera feeds on a simulated large screen.
   - Full Immersion Mode: Experience direct video feed from the robot's front camera.

## Project Roadmap

### Year 1 (Current)
- [x] Develop core HORUS interface in Unity
- [x] Implement teleoperation modes for wheeled robots
- [ ] Complete multi-robot management for wheeled robots
- [ ] Conduct initial user testing and refine interface

### Year 2
- [ ] Extend support for legged (Spot) and aerial (Airvolute, DJI Tello) robots
- [ ] Implement advanced trajectory planning and debugging
- [ ] Develop multi-operator functionality
- [ ] Integrate AI copilot system for operator assistance

### Year 3
- [ ] Develop and implement collaborative strategies for heterogeneous robot teams
- [ ] Conduct extensive experimental validation
- [ ] Optimize system based on experimental results
- [ ] Open-source the HORUS application and develop SDK

## Contributing

We welcome contributions to the HORUS project! Please read our [Contributing Guidelines](CONTRIBUTING.md) for more information on how to get started.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact:
[Omotoye Shamsudeen Adekoya](https://rubrica.unige.it/personale/UkFEXVhg)
Email: omotoye.adekoya@edu.unige.it

## Acknowledgments

This project is being developed as part of a PhD research at the University of Genoa, under the supervision of [Prof Carmine Recchiuto](https://rubrica.unige.it/personale/UkNDWV1r) and [Prof Antonio Sgorbissa](https://rubrica.unige.it/personale/UkNHWlJp).

---

Developed by  [RICE Lab](https://rice.dibris.unige.it/) <img src="imgs/rice_lab_logo.png" width="20"/> at the [University of Genoa](https://unige.it/en) <img src="/imgs/unige.png" width="15"/>
